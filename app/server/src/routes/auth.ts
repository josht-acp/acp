import { FastifyInstance } from 'fastify';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { query, queryOne } from '../db/client';
import { sendMagicLink } from '../lib/mailer';

const RequestLinkSchema = z.object({
  email: z.string().email(),
});

const VerifyTokenSchema = z.object({
  token: z.string().min(32),
});

export async function authRoutes(app: FastifyInstance) {
  /* POST /api/v1/auth/request-link
     Body: { email }
     Creates a magic link token and emails it to the LP.
  */
  app.post('/request-link', async (req, reply) => {
    const body = RequestLinkSchema.safeParse(req.body);
    if (!body.success) return reply.status(400).send({ error: 'Invalid email' });

    const { email } = body.data;
    const user = await queryOne<{ id: string; name: string; email: string }>(
      'SELECT id, name, email FROM users WHERE email = $1 AND active = true',
      [email]
    );

    // Always return 200 to prevent email enumeration
    if (!user) return { ok: true };

    // Invalidate old unused tokens
    await query(
      'UPDATE magic_links SET used_at = now() WHERE user_id = $1 AND used_at IS NULL AND expires_at > now()',
      [user.id]
    );

    const token = randomBytes(32).toString('hex');
    await query(
      'INSERT INTO magic_links (user_id, token, ip) VALUES ($1, $2, $3)',
      [user.id, token, req.ip]
    );

    const link = `${process.env.APP_URL || 'http://localhost:3000'}/portal/auth/verify?token=${token}`;

    try {
      await sendMagicLink(user.email, user.name, link);
    } catch (err) {
      // In development with no SMTP configured, log the link to console
      console.log(`\n[DEV] Magic link for ${user.email}:\n${link}\n`);
      if (process.env.NODE_ENV === 'production') throw err;
    }

    return { ok: true };
  });

  /* GET /api/v1/auth/verify?token=xxx
     Validates the magic link token and issues a JWT session.
  */
  app.get('/verify', async (req, reply) => {
    const { token } = req.query as { token?: string };
    if (!token) return reply.status(400).send({ error: 'Missing token' });

    const link = await queryOne<{ id: string; user_id: string; expires_at: string; used_at: string | null }>(
      'SELECT id, user_id, expires_at, used_at FROM magic_links WHERE token = $1',
      [token]
    );

    if (!link || link.used_at) return reply.status(401).send({ error: 'Invalid or expired link' });
    if (new Date(link.expires_at) < new Date()) return reply.status(401).send({ error: 'Link expired' });

    // Mark token used
    await query('UPDATE magic_links SET used_at = now() WHERE id = $1', [link.id]);

    // Update last_login
    await query('UPDATE users SET last_login = now() WHERE id = $1', [link.user_id]);

    // Create session
    const jti = randomBytes(16).toString('hex');
    await query(
      'INSERT INTO sessions (user_id, jwt_jti, ip, ua) VALUES ($1, $2, $3, $4)',
      [link.user_id, jti, req.ip, req.headers['user-agent'] ?? null]
    );

    // Issue JWT (30 day expiry)
    const jwt = app.jwt.sign(
      { sub: link.user_id, jti },
      { expiresIn: '30d' }
    );

    // Audit
    await query(
      'INSERT INTO audit_log (user_id, action, ip, ua) VALUES ($1, $2, $3, $4)',
      [link.user_id, 'auth.login', req.ip, req.headers['user-agent'] ?? null]
    );

    return reply.send({ token: jwt });
  });

  /* POST /api/v1/auth/logout */
  app.post('/logout', async (req, reply) => {
    try {
      await req.jwtVerify();
      await query(
        'UPDATE sessions SET revoked_at = now() WHERE jwt_jti = $1',
        [(req.user as { jti: string }).jti]
      );
    } catch { /* already invalid */ }
    return { ok: true };
  });
}
