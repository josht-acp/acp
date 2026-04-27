import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth';
import { contactRoutes } from './routes/contact';
import { lpRoutes } from './routes/lp';

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';

async function build() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty' }
        : undefined,
    },
  });

  // ── Security ──────────────────────────────────────────────────
  await app.register(helmet, {
    contentSecurityPolicy: false, // handled by Cloudflare
  });

  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [
      'http://localhost:3000',
      'https://ascensioncapitalpartner.com',
    ],
    credentials: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
  });

  // ── Auth ──────────────────────────────────────────────────────
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'change-me-in-production-min-32-chars',
    sign: { algorithm: 'HS256' },
  });

  // ── Routes ────────────────────────────────────────────────────
  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(contactRoutes, { prefix: '/api/v1/contact' });
  await app.register(lpRoutes, { prefix: '/api/v1/lp' });

  // ── Health check ──────────────────────────────────────────────
  app.get('/health', async () => ({ status: 'ok', ts: new Date().toISOString() }));

  return app;
}

build().then(app => {
  app.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) { app.log.error(err); process.exit(1); }
    app.log.info(`ACP API server running at ${address}`);
  });
}).catch(err => {
  console.error(err);
  process.exit(1);
});
