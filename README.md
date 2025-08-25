# Legaci — Your story, in motion.

This repository contains the Legaci web app (frontend + backend) — an interactive, privacy-first memory & persona system with a 3D disco-ball UI, RAG, and optional voice features.

Quick links (important files)
- Backend worker: [`backend/src/worker/embeddingsWorker.ts:1`](backend/src/worker/embeddingsWorker.ts:1)
- Voice worker: [`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1)
- Backend ingest route: [`backend/src/app/api/sources/ingest/route.ts:1`](backend/src/app/api/sources/ingest/route.ts:1)
- Embeddings wrapper: [`backend/src/lib/embeddings.ts:1`](backend/src/lib/embeddings.ts:1)
- Qdrant wrapper: [`backend/src/lib/qdrant.ts:1`](backend/src/lib/qdrant.ts:1)
- Disco ball shader: [`frontend/src/lib/shaders/discoBall.ts:1`](frontend/src/lib/shaders/discoBall.ts:1)
- DiscoBall component: [`frontend/src/components/DiscoBall.tsx:1`](frontend/src/components/DiscoBall.tsx:1)
- Inspector: [`frontend/src/components/InspectorPanel.tsx:1`](frontend/src/components/InspectorPanel.tsx:1)
- Chat panel: [`frontend/src/components/ChatPanel.tsx:1`](frontend/src/components/ChatPanel.tsx:1)
- Auth helpers (passkeys): [`backend/src/lib/auth.ts:1`](backend/src/lib/auth.ts:1)
- Session middleware: [`backend/src/lib/session.ts:1`](backend/src/lib/session.ts:1)
- Crypto helpers: [`backend/src/lib/crypto.ts:1`](backend/src/lib/crypto.ts:1)
- Voice routes: [`backend/src/app/api/voice/consent/route.ts:1`](backend/src/app/api/voice/consent/route.ts:1), [`backend/src/app/api/voice/clone/route.ts:1`](backend/src/app/api/voice/clone/route.ts:1)
- Voice profile delete: [`backend/src/app/api/voice/profiles/[id]/route.ts:1`](backend/src/app/api/voice/profiles/[id]/route.ts:1)

Summary of recent additions
- Session middleware to resolve session cookies and attach user: [`backend/src/lib/session.ts:1`](backend/src/lib/session.ts:1)
- Logout and session revoke endpoints:
  - POST `/api/auth/logout` — [`backend/src/app/api/auth/logout/route.ts:1`](backend/src/app/api/auth/logout/route.ts:1)
  - POST `/api/auth/sessions/revoke` — [`backend/src/app/api/auth/sessions/revoke/route.ts:1`](backend/src/app/api/auth/sessions/revoke/route.ts:1)
- Voice consent endpoint now requires a session and stores a `voice_profiles` row: [`backend/src/app/api/voice/consent/route.ts:1`](backend/src/app/api/voice/consent/route.ts:1)
- Server-side voice cloning flow:
  - POST `/api/voice/clone` enqueues a background job: [`backend/src/app/api/voice/clone/route.ts:1`](backend/src/app/api/voice/clone/route.ts:1)
  - Background worker processes cloning & deletion: [`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1)
- DELETE `/api/voice/profiles/:id` enqueues provider deletion + local purge: [`backend/src/app/api/voice/profiles/[id]/route.ts:1`](backend/src/app/api/voice/profiles/[id]/route.ts:1)
- E2E scaffolding (Playwright) and test helper:
  - Test helper to create a session cookie: [`backend/src/app/api/test/login-as/route.ts:1`](backend/src/app/api/test/login-as/route.ts:1)
  - Playwright config: [`playwright.config.ts:1`](playwright.config.ts:1)
  - E2E test: [`tests/e2e/voice-lifecycle.spec.ts:1`](tests/e2e/voice-lifecycle.spec.ts:1)

Development setup (local)
1. Install repository dependencies (root)
   - pnpm install

2. Backend
   - Ensure env vars are set in `backend/.env` (see Environment variables below).
   - Generate Prisma client:
     - npx prisma generate --schema=backend/prisma/schema.prisma
   - Install worker/runtime deps (if you want to run workers):
     - pnpm -C backend add bullmq ioredis
   - Start the backend (Next.js App Router):
     - pnpm -C backend dev

3. Frontend
   - pnpm -C frontend dev

4. Workers
   - Embeddings worker:
     - pnpm -C backend add -D ts-node typescript
     - node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts
   - Voice worker:
     - node -r ts-node/register ./backend/src/worker/voiceWorker.ts
   - In production run workers as separate processes with the same env.

Playwright E2E (local)
- The repository includes a Playwright config and an E2E smoke test covering the voice lifecycle.
- To run tests locally:
  1. Install Playwright and browsers:
     - pnpm -C . add -D @playwright/test playwright
     - npx playwright install --with-deps
  2. Enable the test helper route in the backend by setting:
     - PLAYWRIGHT_TESTING=true (in backend/.env or environment)
  3. Start backend and frontend dev servers.
  4. Run tests:
     - npx playwright test
- E2E notes:
  - The test uses a test helper route `/api/test/login-as` to create a session cookie for a test user. This is gated by `PLAYWRIGHT_TESTING=true` to avoid exposing the helper in production.
  - The tests enqueue jobs (voice clone / delete). In CI you can either run the worker (recommended) or mock provider calls.

Environment variables
Add a `.env` in `backend/` (or place in your deployment env). Minimum variables for dev/testing:
- DATABASE_URL=postgresql://user:pass@host:5432/dbname
- NEXTAUTH_URL=http://localhost:3000
- RP_ID=localhost
- RP_NAME=Legaci
- OPENROUTER_API_KEY=... (or OPENAI_API_KEY)
- EMBEDDING_MODEL=text-embedding-3-large (optional)
- QDRANT_URL=https://your-qdrant-endpoint
- QDRANT_API_KEY=...
- QDRANT_COLLECTION=legaci_vectors
- REDIS_URL=redis://:password@host:port
- FIELD_ENCRYPTION_KEY=<32-bytes hex> (use: openssl rand -hex 32)
- ELEVENLABS_API_KEY=... (if using TTS)
- PLAYWRIGHT_TESTING=true (for running E2E locally)

Common dev commands
- Install deps (root): pnpm install
- Generate Prisma (backend): npx prisma generate --schema=backend/prisma/schema.prisma
- Start frontend: pnpm -C frontend dev
- Start backend: pnpm -C backend dev
- Start worker (embeddings): node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts
- Start worker (voice): node -r ts-node/register ./backend/src/worker/voiceWorker.ts
- Run Playwright tests: npx playwright test

How ingest → embeddings works (quick)
1. POST file (audio/text) to `/api/sources/ingest` (`backend/src/app/api/sources/ingest/route.ts:1`)
2. The route transcribes (if audio) and saves an encrypted source.
3. The route automatically enqueues an embeddings job (BullMQ). The embeddings worker creates embeddings and upserts them to Qdrant.
4. Check job status: GET `/api/embeddings/status/:jobId` (`backend/src/app/api/embeddings/status/[id]/route.ts:1`).

Voice consent & cloning (summary)
- Consent upload: POST `/api/voice/consent` (protected by session). See [`backend/src/app/api/voice/consent/route.ts:1`](backend/src/app/api/voice/consent/route.ts:1).
- Clone request: POST `/api/voice/clone` — enqueues a background job processed by [`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1).
- Revoke/delete: DELETE `/api/voice/profiles/:id` enqueues a deletion job handled by the voice worker. See [`backend/src/app/api/voice/profiles/[id]/route.ts:1`](backend/src/app/api/voice/profiles/[id]/route.ts:1).
- Samples and provider models are treated as sensitive and deleted on revoke.

Troubleshooting
- "prisma not found": ensure `npx prisma generate` ran in `backend` and that `@prisma/client` is installed.
- Worker errors: verify `REDIS_URL`, and that `bullmq` & `ioredis` are installed in backend.
- Qdrant errors: confirm `QDRANT_URL` / `QDRANT_API_KEY`.
- WebAuthn: use HTTPS in production and set `NEXTAUTH_URL` correctly.

Security & privacy reminders
- Field encryption:
  - Use [`backend/src/lib/crypto.ts:1`](backend/src/lib/crypto.ts:1) helpers for AES‑GCM field encryption.
  - Keep `FIELD_ENCRYPTION_KEY` in KMS for production.
- Sessions:
  - HttpOnly, Secure (production), SameSite=Strict cookies are used for session tokens (hashed in DB).
  - Use logout & revoke endpoints to invalidate sessions.
- CSRF:
  - Use double-submit CSRF token pattern on state-changing routes. WebAuthn start endpoints set a short-lived csrf cookie used by the client.
- Logging:
  - Log only metadata; never log raw audio or decrypted sensitive content.

Where to read code (important files)
- Auth & passkeys: [`backend/src/lib/auth.ts:1`](backend/src/lib/auth.ts:1)
- Passkey routes: [`backend/src/app/api/auth/register-passkey/route.ts:1`](backend/src/app/api/auth/register-passkey/route.ts:1), [`backend/src/app/api/auth/register-passkey/verify/route.ts:1`](backend/src/app/api/auth/register-passkey/verify/route.ts:1), [`backend/src/app/api/auth/login-passkey/route.ts:1`](backend/src/app/api/auth/login-passkey/route.ts:1), [`backend/src/app/api/auth/login-passkey/verify/route.ts:1`](backend/src/app/api/auth/login-passkey/verify/route.ts:1)
- Session helper: [`backend/src/lib/session.ts:1`](backend/src/lib/session.ts:1)
- Voice endpoints: [`backend/src/app/api/voice/consent/route.ts:1`](backend/src/app/api/voice/consent/route.ts:1), [`backend/src/app/api/voice/clone/route.ts:1`](backend/src/app/api/voice/clone/route.ts:1)
- Workers: embeddings worker [`backend/src/worker/embeddingsWorker.ts:1`](backend/src/worker/embeddingsWorker.ts:1) and voice worker [`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1)
- Test helper: [`backend/src/app/api/test/login-as/route.ts:1`](backend/src/app/api/test/login-as/route.ts:1)
- Playwright test: [`tests/e2e/voice-lifecycle.spec.ts:1`](tests/e2e/voice-lifecycle.spec.ts:1)

If you want, I will:
- Add a dedicated "Privacy & Consent" markdown file with UI copy (I already created [`docs/privacy-consent.md:1`](docs/privacy-consent.md:1)); or
- Implement more server-side delete/export endpoints; or
- Expand Playwright tests to mock provider APIs and assert post-worker state.

Which should I do next?
## Playwright CI & Provider-mocking guidance

This project includes Playwright E2E tests (`[`playwright.config.ts:1`](playwright.config.ts:1)` and `[`tests/e2e/voice-lifecycle.spec.ts:1`](tests/e2e/voice-lifecycle.spec.ts:1)`). Below are recommended CI and local strategies for running the tests reliably, including provider-mock options.

1) CI overview (GitHub Actions)
- Steps:
  1. Install dependencies (root + backend + frontend).
  2. Run database migrations and `npx prisma generate` for `backend`.
  3. Start backend (Next dev or production server) on a port (e.g., 3000).
  4. Start required workers (embeddings and voice) OR rely on simulated provider behavior (see mocking options).
  5. Install Playwright browsers and run `npx playwright test`.
- Minimal GitHub Actions job (example snippet):
  - name: E2E
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install deps
        run: pnpm install
      - name: Generate prisma
        run: pnpm -C backend exec npx prisma generate --schema=backend/prisma/schema.prisma
      - name: Start backend
        run: pnpm -C backend dev & sleep 3
      - name: Start workers (optional)
        run: pnpm -C backend exec node -r ts-node/register ./backend/src/worker/voiceWorker.ts & pnpm -C backend exec node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts &
      - name: Install Playwright
        run: pnpm -C . add -D @playwright/test playwright && pnpx playwright install --with-deps
      - name: Run E2E
        env:
          PLAYWRIGHT_TESTING: "true"
          PLAYWRIGHT_BASE_URL: "http://localhost:3000"
        run: npx playwright test --reporter=list

2) Mocking vs running the real provider
- Fast / deterministic CI (recommended):
  - Do NOT call external provider APIs during CI. Instead:
    - Option A (preferred): Run the voice worker but with provider env unset (no ELEVENLABS_API_KEY). The worker will simulate creation/deletion and produce deterministic `sim-...` voice IDs. This is supported by the worker implementation in `[`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1)`.
    - Option B: Start a small mock HTTP server that implements the minimal provider endpoints your tests expect and set ELEVENLABS_API_KEY to a dummy value pointing to the mock server.
- End-to-end with real provider (use with caution):
  - Only run if you have a test provider account and understand billing/retention. Ensure you delete test voices after the run. Use short-lived provider keys and strict throttling.

3) Local developer flow for E2E
- Start services:
  - Start DB & run migrations.
  - Start backend: `pnpm -C backend dev`
  - Optionally start workers:
    - `node -r ts-node/register ./backend/src/worker/voiceWorker.ts`
    - `node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts`
- Enable test helper and run:
  - Set `PLAYWRIGHT_TESTING=true` in `backend/.env`
  - `npx playwright test`
- Notes:
  - The test uses the helper route `[`/api/test/login-as`](backend/src/app/api/test/login-as/route.ts:1)` to create a session cookie so tests can bypass WebAuthn; this helper is gated by `PLAYWRIGHT_TESTING=true` and must not be enabled in production.

4) Debugging CI failures
- If tests fail because jobs weren't processed:
  - Ensure the voice worker is running, or rely on the worker's simulation fallback (no `ELEVENLABS_API_KEY`).
- If tests fail due to missing env:
  - Verify `FIELD_ENCRYPTION_KEY` and `DATABASE_URL` are set in the CI environment.
- If provider calls time out:
  - Prefer mocking or simulation in CI.

5) Files to inspect
- Playwright config: `[`playwright.config.ts:1`](playwright.config.ts:1)`
- E2E test: `[`tests/e2e/voice-lifecycle.spec.ts:1`](tests/e2e/voice-lifecycle.spec.ts:1)`
- Test helper (login-as): `[`backend/src/app/api/test/login-as/route.ts:1`](backend/src/app/api/test/login-as/route.ts:1)`
- Voice worker (simulation & provider calls): `[`backend/src/worker/voiceWorker.ts:1`](backend/src/worker/voiceWorker.ts:1)`

If you want, I can also:
- Add a sample GitHub Actions workflow file in `.github/workflows/e2e.yml`.
- Add a simple mock provider server (Express) under `tests/mocks/provider-mock.ts` and a small helper that CI can run before tests.