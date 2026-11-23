import crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * Checks `Authorization: Bearer <WHATSAPP_ADMIN_KEY>`.
 * Fails closed: if WHATSAPP_ADMIN_KEY isn't set, every request is rejected.
 */
export function isAuthorizedAdmin(req: NextRequest): boolean {
  const expected = process.env.WHATSAPP_ADMIN_KEY;
  if (!expected) return false;

  const header = req.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const received = Buffer.from(match[1].trim());
  const target = Buffer.from(expected);
  if (received.length !== target.length) return false;
  return crypto.timingSafeEqual(received, target);
}
