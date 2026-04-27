import { FastifyRequest, FastifyReply } from 'fastify';
import { queryOne } from '../db/client';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  firm: string | null;
  role: string | null;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; jti: string; email: string };
    user: AuthUser;
  }
}

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();

    // Check session is not revoked
    const session = await queryOne<{ revoked_at: string | null }>(
      'SELECT revoked_at FROM sessions WHERE jwt_jti = $1',
      [req.user.jti]
    );
    if (!session || session.revoked_at) {
      return reply.status(401).send({ error: 'Session expired' });
    }

    // Load user
    const user = await queryOne<AuthUser>(
      'SELECT id, email, name, firm, role FROM users WHERE id = $1 AND active = true',
      [req.user.sub]
    );
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });

    req.user = { ...req.user, ...user };
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
