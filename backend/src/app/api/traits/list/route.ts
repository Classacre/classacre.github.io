// backend/src/app/api/traits/list/route.ts
 import { getPrisma } from '../../../../lib/prisma';
 import { NextResponse } from 'next/server';
 
 export const runtime = 'nodejs';
 
 export async function GET() {
   try {
     const prisma = await getPrisma();
     // TODO: replace testUserId with real user id from auth/session
     const userId = "testUserId";
 
     const rows = await prisma.traits.findMany({
       where: { user_id: userId },
       orderBy: [{ category: 'asc' }, { updated_at: 'desc' }],
     });
 
     // Build a lightweight persona summary: per-category averages and counts
     const summary: Record<
       string,
       { count: number; avgCompleteness: number; avgConfidence: number }
     > = {};
 
     for (const r of rows) {
       const cat = r.category || 'Misc/Notes';
       if (!summary[cat]) summary[cat] = { count: 0, avgCompleteness: 0, avgConfidence: 0 };
       summary[cat].count += 1;
       summary[cat].avgCompleteness += Number(r.completeness || 0);
       summary[cat].avgConfidence += Number(r.confidence || 0);
     }
     for (const k of Object.keys(summary)) {
       const s = summary[k];
       s.avgCompleteness = s.count ? s.avgCompleteness / s.count : 0;
       s.avgConfidence = s.count ? s.avgConfidence / s.count : 0;
     }
 
     // Return traits as-is. Some traits in this codebase are stored encrypted;
     // decryption would require knowing the exact envelope format (iv/tag/ciphertext).
     // For now return the value_json field (may be plaintext JSON or an encrypted string).
     const traits = rows.map((r) => ({
       id: r.id,
       category: r.category,
       key: r.key,
       value_json: r.value_json,
       confidence: r.confidence,
       completeness: r.completeness,
       provenance: r.provenance,
       updated_at: r.updated_at,
     }));
 
     return NextResponse.json({ ok: true, traits, summary });
   } catch (err: any) {
     console.error('[traits/list] error', err);
     return new Response(JSON.stringify({ error: err?.message || 'Failed to list traits' }), {
       status: 500,
       headers: { 'Content-Type': 'application/json' },
     });
   }
 }