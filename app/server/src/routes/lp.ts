import { FastifyInstance } from 'fastify';
import { query, queryOne } from '../db/client';
import { requireAuth } from '../middleware/auth';

function centsToDisplay(cents: number): string {
  const val = cents / 100;
  if (val >= 1_000_000_000) return `A$${(val / 1_000_000_000).toFixed(1)}BN`;
  if (val >= 1_000_000) return `A$${(val / 1_000_000).toFixed(1)}M`;
  return `A$${val.toLocaleString()}`;
}

export async function lpRoutes(app: FastifyInstance) {
  app.addHook('preHandler', requireAuth);

  /* GET /api/v1/lp/overview */
  app.get('/overview', async (req) => {
    const userId = (req.user as { id: string }).id;

    const commitments = await query<{
      fund_code: string; fund_name: string; commitment: string; called: string;
      distributed: string; nav: string; tvpi: string; dpi: string; rvpi: string;
      irr: string; as_of_date: string;
    }>(`
      SELECT f.code as fund_code, f.name as fund_name, f.currency,
             c.commitment, c.called, c.distributed, c.nav,
             c.tvpi, c.dpi, c.rvpi, c.irr, c.as_of_date
      FROM lp_commitments c
      JOIN funds f ON f.id = c.fund_id
      WHERE c.user_id = $1
      ORDER BY f.vintage
    `, [userId]);

    const totalCommitment = commitments.reduce((s, c) => s + parseInt(c.commitment), 0);
    const totalCalled     = commitments.reduce((s, c) => s + parseInt(c.called), 0);
    const totalDistributed = commitments.reduce((s, c) => s + parseInt(c.distributed), 0);
    const totalNAV        = commitments.reduce((s, c) => s + parseInt(c.nav), 0);

    await query(
      'INSERT INTO audit_log (user_id, action, resource) VALUES ($1, $2, $3)',
      [userId, 'portal.overview', null]
    );

    return {
      summary: {
        commitment:  centsToDisplay(totalCommitment),
        called:      centsToDisplay(totalCalled),
        distributed: centsToDisplay(totalDistributed),
        nav:         centsToDisplay(totalNAV),
        uncalled:    centsToDisplay(totalCommitment - totalCalled),
      },
      funds: commitments.map(c => ({
        fund:  c.fund_code,
        name:  c.fund_name,
        commitment:  centsToDisplay(parseInt(c.commitment)),
        called:      centsToDisplay(parseInt(c.called)),
        distributed: centsToDisplay(parseInt(c.distributed)),
        nav:         centsToDisplay(parseInt(c.nav)),
        tvpi: c.tvpi ? parseFloat(c.tvpi).toFixed(2) + 'x' : '—',
        dpi:  c.dpi  ? parseFloat(c.dpi).toFixed(2)  + 'x' : '—',
        rvpi: c.rvpi ? parseFloat(c.rvpi).toFixed(2) + 'x' : '—',
        irr:  c.irr  ? parseFloat(c.irr).toFixed(1)  + '%' : '—',
        asOf: c.as_of_date,
      })),
    };
  });

  /* GET /api/v1/lp/capital-calls */
  app.get('/capital-calls', async (req) => {
    const userId = (req.user as { id: string }).id;

    const calls = await query<{
      call_number: number; amount: string; due_date: string; paid_date: string | null;
      status: string; notice_url: string | null; fund_name: string;
    }>(`
      SELECT cc.call_number, cc.amount, cc.due_date, cc.paid_date, cc.status,
             cc.notice_url, f.name as fund_name
      FROM capital_calls cc
      JOIN funds f ON f.id = cc.fund_id
      WHERE cc.user_id = $1
      ORDER BY cc.due_date DESC
    `, [userId]);

    return calls.map(c => ({
      fund:      c.fund_name,
      callNum:   c.call_number,
      amount:    centsToDisplay(parseInt(c.amount)),
      dueDate:   c.due_date,
      paidDate:  c.paid_date,
      status:    c.status,
      noticeUrl: c.notice_url,
    }));
  });

  /* GET /api/v1/lp/documents */
  app.get('/documents', async (req) => {
    const userId = (req.user as { id: string }).id;

    const docs = await query<{
      id: string; title: string; category: string; size_bytes: number; uploaded_at: string; fund_name: string | null;
    }>(`
      SELECT d.id, d.title, d.category, d.size_bytes, d.uploaded_at,
             f.name as fund_name
      FROM documents d
      LEFT JOIN funds f ON f.id = d.fund_id
      WHERE d.user_id = $1 OR d.user_id IS NULL
      ORDER BY d.uploaded_at DESC
    `, [userId]);

    await query(
      'INSERT INTO audit_log (user_id, action, resource) VALUES ($1, $2, $3)',
      [userId, 'portal.documents.list', null]
    );

    return docs.map(d => ({
      id:       d.id,
      title:    d.title,
      category: d.category,
      fund:     d.fund_name,
      size:     d.size_bytes ? `${Math.round(d.size_bytes / 1024)} KB` : null,
      date:     d.uploaded_at,
    }));
  });

  /* GET /api/v1/lp/documents/:id/download
     Returns a pre-signed S3 URL (or stub in dev).
  */
  app.get('/documents/:id/download', async (req, reply) => {
    const userId = (req.user as { id: string }).id;
    const { id } = req.params as { id: string };

    const doc = await queryOne<{ id: string; s3_key: string; title: string }>(
      'SELECT id, s3_key, title FROM documents WHERE id = $1 AND (user_id = $2 OR user_id IS NULL)',
      [id, userId]
    );

    if (!doc) return reply.status(404).send({ error: 'Not found' });

    await query(
      'INSERT INTO audit_log (user_id, action, resource, metadata) VALUES ($1, $2, $3, $4)',
      [userId, 'doc.download', id, JSON.stringify({ title: doc.title })]
    );

    // In production: generate S3 pre-signed URL.
    // In dev: return a stub.
    const downloadUrl = process.env.S3_BUCKET
      ? `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${doc.s3_key}?X-Amz-Expires=3600`
      : `/dev-stub-docs/${doc.s3_key}`;

    return { url: downloadUrl, expires: 3600 };
  });

  /* GET /api/v1/lp/messages */
  app.get('/messages', async (req) => {
    const userId = (req.user as { id: string }).id;

    const msgs = await query<{
      id: string; direction: string; subject: string; body: string;
      read_at: string | null; sent_at: string;
    }>(
      'SELECT id, direction, subject, body, read_at, sent_at FROM messages WHERE user_id = $1 ORDER BY sent_at DESC',
      [userId]
    );

    // Mark unread GP messages as read
    const unreadIds = msgs.filter(m => m.direction === 'gp_to_lp' && !m.read_at).map(m => m.id);
    if (unreadIds.length > 0) {
      await query(
        `UPDATE messages SET read_at = now() WHERE id = ANY($1::uuid[])`,
        [unreadIds]
      );
    }

    return msgs;
  });

  /* POST /api/v1/lp/messages */
  app.post('/messages', async (req, reply) => {
    const userId = (req.user as { id: string }).id;
    const { subject, body } = req.body as { subject?: string; body?: string };

    if (!subject || !body || body.length < 10) {
      return reply.status(400).send({ error: 'Subject and body required (min 10 chars)' });
    }

    const [msg] = await query<{ id: string }>(
      `INSERT INTO messages (user_id, direction, subject, body) VALUES ($1, 'lp_to_gp', $2, $3) RETURNING id`,
      [userId, subject, body]
    );

    return reply.status(201).send({ id: msg.id });
  });
}
