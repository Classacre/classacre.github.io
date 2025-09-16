/**
 * backend/src/app/api/sources/get/route.ts
 *
 * Returns metadata for a single source by id. Does NOT return decrypted content.
 * This keeps sensitive data encrypted on the server; a dedicated decrypt endpoint
 * with proper auth/consent would be required to reveal plaintext.
 *
 * Query param: ?id=sourceId
 */

import { getPrisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { requireSession } from '../../../../lib/session';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const { session } = await requireSession(request as any);
    const userId: string = (session as any).user_id;

    const src = await prisma.sources.findFirst({
      where: { id, user_id: userId },
      select: {
        id: true,
        type: true,
        title: true,
        created_at: true,
        iv: true,
        // Do not return content_encrypted here
      },
    });

    if (!src) {
      return new Response(JSON.stringify({ error: 'Source not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return NextResponse.json({ ok: true, source: src });
  } catch (err: any) {
    console.error('[sources/get] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Failed to fetch source' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}