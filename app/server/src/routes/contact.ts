import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { query } from '../db/client';
import { sendContactNotification } from '../lib/mailer';

const FREE_MAILERS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'icloud.com', 'protonmail.com', 'mail.com',
]);

const ContactSchema = z.object({
  name:       z.string().min(2).max(120),
  firm:       z.string().min(2).max(120),
  role:       z.string().min(2).max(120),
  email:      z.string().email(),
  phone:      z.string().max(40).optional(),
  engagement: z.string().min(2).max(80),
  message:    z.string().min(140).max(500),
  consent:    z.literal(true),
});

export async function contactRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const body = ContactSchema.safeParse(req.body);
    if (!body.success) {
      return reply.status(400).send({ error: 'Validation failed', issues: body.error.issues });
    }

    const { name, firm, role, email, phone, engagement, message } = body.data;

    // Block free-mail addresses
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    if (FREE_MAILERS.has(domain)) {
      return reply.status(422).send({ error: 'Institutional email address required' });
    }

    // Store in DB
    await query(
      `INSERT INTO enquiries (name, firm, role, email, phone, engagement, message, ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, firm, role, email, phone ?? null, engagement, message, req.ip]
    );

    // Email notification (non-blocking — don't let mail failure kill the response)
    sendContactNotification({ name, firm, role, email, phone, engagement, message })
      .catch(err => app.log.error({ err }, 'Contact notification failed'));

    return reply.status(201).send({ ok: true });
  });
}
