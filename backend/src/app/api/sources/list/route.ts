/**
 * backend/src/app/api/sources/list/route.ts
 *
 * Returns a lightweight list of sources for the current user, optionally filtered by category.
 * This endpoint intentionally does not return decrypted content — frontend can request
 * richer data via a dedicated export/decrypt endpoint (not implemented here).
 *
 * Note: For now routes use a testUserId until authentication/session wiring is in place.
 */

import { getPrisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    // TODO: derive userId from session
    const userId = 'testUserId';

    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    // Allow optional filtering by source type or category if provided; currently schema
    // stores category on embeddings/traits but sources may not have category — so we filter by title heuristics if needed.
    const where: any = { user_id: userId };
    if (category) {
      // Simple heuristic: return sources whose title contains the category string (case-insensitive)
      where.OR = [
        { title: { contains: category, mode: 'insensitive' } },
        // if content_encrypted metadata had category it would be used; for now this is a best-effort filter
      ];
    }

    const rows = await prisma.sources.findMany({
      where,
      orderBy: [{ created_at: 'desc' }],
      take: 200,
      select: {
        id: true,
        type: true,
        title: true,
        created_at: true,
      },
    });

    return NextResponse.json({ ok: true, sources: rows });
  } catch (err: any) {
    console.error('[sources/list] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Failed to list sources' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}