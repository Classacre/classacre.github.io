# Privacy & Consent — Voice Cloning (Legaci)

This document provides detailed UI copy, API examples, audit log schema, and developer guidance for a clear, privacy‑first voice cloning consent flow.

Files referenced
- UI consent component (example): [`frontend/src/components/VoiceConsent.tsx`](frontend/src/components/VoiceConsent.tsx:1)
- Backend consent route: [`backend/src/app/api/voice/consent/route.ts`](backend/src/app/api/voice/consent/route.ts:1)
- Voice profile model: [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma:131)
- Crypto helpers: [`backend/src/lib/crypto.ts`](backend/src/lib/crypto.ts:1)
- Worker: [`backend/src/worker/voiceWorker.ts`](backend/src/worker/voiceWorker.ts:1)

Overview
- Consent must be explicit, informed, and reversible.
- Raw samples and derived voice models are sensitive; store encrypted at rest, limit access, and support removal on revoke.
- Provider API keys must never be exposed to the browser.

UI copy & flows (ready for i18n)
- Modal title: "Create a voice that sounds like you"
- Primary: "With your permission, Legaci will use short audio samples you record to create a custom voice model to speak replies in a voice that sounds like you. You can revoke consent and request deletion at any time."
- Bullets:
  - "What we collect: up to 1–2 minutes of audio samples."
  - "How we store it: samples are encrypted and stored in object storage."
  - "Provider use: we only send samples to the voice provider after you consent."
  - "Revoke anytime: deleting your voice removes samples and provider models."
- Checkbox label: "I understand and consent to Legaci creating a voice model using my audio samples."
- Primary CTA: "I consent and upload samples"

API: request / response examples
- POST /api/voice/consent
  - Purpose: record consent + upload sample (multipart or signed upload).
  - Headers: Cookie session, X-CSRF-Token (double-submit)
  - Example (curl, multipart):
    curl -v -X POST "https://.../api/voice/consent" \
      -H "Cookie: session=..." \
      -H "X-CSRF-Token: <csrf>" \
      -F "content=@sample.wav;type=audio/wav" \
      -F "consent={\"accepted\":true}" \
      -F "title=My voice sample"
  - Success response:
    {
      "ok": true,
      "source": { "id": "<sourceId>", "title": "My voice sample" },
      "voice_profile": { "id": "<voiceProfileId>" }
    }

- POST /api/voice/clone
  - Purpose: server-side enqueue to build provider voice model (must be called after consent).
  - Body: { "voiceProfileId": "<id>", "sourceId": "<optional source id>" }
  - Response: 202 Accepted { ok:true, enqueued:true, jobId: "<job>" }

- DELETE /api/voice/profiles/:id
  - Purpose: revoke & delete provider model and local samples. Enqueues background deletion job.
  - Response: 202 Accepted { ok:true, enqueued:true, jobId: "<job>" }

Audit log schema (suggested)
- Table: voice_audit_logs
  - id STRING PK
  - user_id STRING
  - voice_profile_id STRING
  - event_type ENUM('consent_granted','consent_revoked','clone_requested','provider_deleted')
  - event_meta JSON (e.g., { sample_hash, sample_length, provider: 'elevenlabs' })
  - created_at TIMESTAMP
- Keep logs minimal (no raw audio).

Storage & encryption
- Store raw audio in object storage (R2/S3) on a non-guessable path: /samples/{userId}/{voiceProfileId}/{uuid}.wav
- Store metadata in `voice_profiles.sample_meta` (json) and encrypted sample blob (or encryption envelope) if direct DB storage is used.
- Use AES‑GCM envelope helpers: [`backend/src/lib/crypto.ts`](backend/src/lib/crypto.ts:1)
- Master key: provide via KMS in production (FIELD_ENCRYPTION_KEY).

Provider integration & deletion semantics
- Always perform provider calls server-to-server.
- Save provider name & voice_id in `voice_profiles`.
- On revoke:
  - Enqueue provider deletion job; worker will call provider delete endpoint and purge samples from object storage.
  - Update `voice_profiles` to reflect revocation and deletion status.

Developer checklist
- Add explicit consent modal and require the checkbox before upload.
- Record `consent_signed_at` timestamp in `voice_profiles`.
- Gate provider cloning behind recorded consent.
- Implement DELETE flow to schedule provider deletion and local purge.
- Ensure audit logging for consent and deletion events.

Compliance notes
- Retention policy: document retention period and allow users to request export prior to deletion.
- For export: provide signed short-lived URLs for object storage samples only when the user explicitly requests decrypted data.

Further actions available
- I can implement the audit log table + writes.
- I can add example UI component (`frontend/src/components/VoiceConsent.tsx`) wired to the consent route.
- I can add explicit curl & OpenAPI snippets into `docs/api-voice.md`.