/**
 * backend/src/app/api/voice/consent/route.ts
 *
 * Protected consent endpoint:
 * - Requires a valid session cookie
 * - Accepts multipart/form-data with:
 *   - content (File) = audio sample
 *   - type/title fields
 *   - consent (JSON string) { accepted: boolean }
 * - Encrypts the sample using backend crypto helpers and stores it as a `sources` row
 * - Creates a `voice_profiles` row with consent_signed_at + sample_meta
 */
 
import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/prisma";
import { encrypt } from "../../../../lib/crypto";
import { requireSession } from "../../../../lib/session";
 
export const runtime = "nodejs";
 
export async function POST(req: NextRequest) {
  try {
    // Require authenticated session; requireSession will throw if unauthorized
    const { user } = await requireSession(req);
    const prisma = await getPrisma();
    const userId = user?.id;
 
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
 
    const form = await req.formData();
    const file = form.get("content") as File | null;
    const type = (form.get("type") as string) || "file";
    const title = (form.get("title") as string) || `voice-sample-${Date.now()}`;
    const consentRaw = form.get("consent") as string | null;
    const consent = consentRaw ? JSON.parse(consentRaw) : null;
 
    if (!consent || consent.accepted !== true) {
      return new NextResponse(JSON.stringify({ error: "Consent not provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
 
    if (!file) {
      return new NextResponse(JSON.stringify({ error: "No audio file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
 
    // Read file into buffer and encrypt (store base64 plaintext inside envelope for now)
    const arrayBuf = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    const { iv, encryptedData } = await encrypt(buf.toString("base64"));
 
    // Create a source entry with encrypted content
    const source = await prisma.sources.create({
      data: {
        user_id: userId,
        type: "file",
        title,
        content_encrypted: Buffer.from(encryptedData, "hex"),
        iv,
      },
    });
 
    // Create voice profile entry (consent recorded)
    const vp = await prisma.voice_profiles.create({
      data: {
        user_id: userId,
        provider: "", // provider will be set after clone step
        voice_id: "",
        consent_signed_at: new Date(),
        sample_meta: {
          name: (file as any).name || "unnamed",
          size: (file as any).size || 0,
          mime: (file as any).type || "application/octet-stream",
          uploaded_at: new Date().toISOString(),
        },
      },
    });
 
    return new NextResponse(
      JSON.stringify({ ok: true, source: { id: source.id, title: source.title }, voice_profile: { id: vp.id } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    if ((err as Error).message === 'Unauthorized') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    console.error("[voice/consent] error", err);
    return new NextResponse(JSON.stringify({ error: err?.message || "Failed to record consent" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}