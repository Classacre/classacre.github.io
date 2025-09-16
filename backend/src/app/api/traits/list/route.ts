// backend/src/app/api/traits/list/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { decryptEnvelope } from '../../../../lib/crypto';
import { requireSession } from '../../../../lib/session';
 
 export const runtime = 'nodejs';
 
export async function GET(request: Request) {
   try {
    const prisma = await getPrisma();
    const { session } = await requireSession(request as any);
    const userId: string = (session as any).user_id;
 
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
 
     // Attempt to decrypt envelope-shaped value_json entries.
     const traits = await Promise.all(
       rows.map(async (r: any) => {
         let value: any = r.value_json;
 
         try {
           if (value && typeof value === 'object' && 'iv' in value && 'ciphertext' in value) {
             // decryptEnvelope expects (ivBase64, encryptedHex)
             const plain = await decryptEnvelope(String(value.iv), String(value.ciphertext));
             try {
               value = JSON.parse(plain);
             } catch {
               value = plain;
             }
           }
         } catch (e) {
           // if decryption fails, leave the envelope as-is but don't throw
           console.warn('Failed to decrypt trait', r.id, e);
         }
 
         return {
           id: r.id,
           category: r.category,
           key: r.key,
           value_json: value,
           confidence: r.confidence,
           completeness: r.completeness,
           provenance: r.provenance,
           updated_at: r.updated_at,
         };
       })
     );
 
     return NextResponse.json({ ok: true, traits, summary });
  } catch (err: any) {
    console.error('[traits/list] error', err);
    const status = err?.message === 'Unauthorized' ? 401 : 500;
    const msg = err?.message === 'Unauthorized' ? 'Unauthorized' : (err?.message || 'Failed to list traits');
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}