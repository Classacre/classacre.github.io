# Legaci — Your story, in motion.

This repository contains the Legaci web app (frontend + backend) — an interactive, privacy-first memory & persona system with a 3D disco-ball UI, RAG, and optional voice features.

Quick links (important files)
- Backend worker: [`backend/src/worker/embeddingsWorker.ts:1`](backend/src/worker/embeddingsWorker.ts:1)
- Backend ingest route: [`backend/src/app/api/sources/ingest/route.ts:1`](backend/src/app/api/sources/ingest/route.ts:1)
- Embeddings wrapper: [`backend/src/lib/embeddings.ts:1`](backend/src/lib/embeddings.ts:1)
- Qdrant wrapper: [`backend/src/lib/qdrant.ts:1`](backend/src/lib/qdrant.ts:1)
- Disco ball shader: [`frontend/src/lib/shaders/discoBall.ts:1`](frontend/src/lib/shaders/discoBall.ts:1)
- DiscoBall component: [`frontend/src/components/DiscoBall.tsx:1`](frontend/src/components/DiscoBall.tsx:1)
- Inspector: [`frontend/src/components/InspectorPanel.tsx:1`](frontend/src/components/InspectorPanel.tsx:1)
- Chat panel: [`frontend/src/components/ChatPanel.tsx:1`](frontend/src/components/ChatPanel.tsx:1)
- Auth helpers (passkeys): [`backend/src/lib/auth.ts:1`](backend/src/lib/auth.ts:1)

Development setup (local)
1. Install repository dependencies (root)
   - pnpm install

2. Backend
   - Ensure env vars (see list below) are set in `backend/.env` or your environment.
   - Generate Prisma client:
     - npx prisma generate --schema=prisma/schema.prisma
   - Install worker/runtime deps (if you want to run the worker):
     - pnpm -C backend add bullmq ioredis
   - Start the backend (Next.js App Router):
     - pnpm -C backend dev

3. Frontend
   - pnpm -C frontend dev

4. Worker (embeddings)
   - Run the worker in a separate terminal. You can use ts-node for quick dev:
     - pnpm -C backend add -D ts-node typescript
     - node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts
   - Or compile & run the bundled worker (recommended for production).

Environment variables
Add a `.env` in `backend/` (or place in your deployment env). Minimum variables for dev/testing:

- DATABASE_URL=postgresql://user:pass@host:5432/dbname
- NEXTAUTH_URL=http://localhost:3000
- RP_ID=localhost
- RP_NAME=Legaci
- OPENROUTER_API_KEY=... (or OPENAI_API_KEY if using OpenAI SDK)
- EMBEDDING_MODEL=text-embedding-3-large (optional)
- QDRANT_URL=https://your-qdrant-endpoint
- QDRANT_API_KEY=...
- QDRANT_COLLECTION=legaci_vectors
- REDIS_URL=redis://:password@host:port
- FIELD_ENCRYPTION_KEY=<32-bytes hex> (use: openssl rand -hex 32)
- ELEVENLABS_API_KEY=... (if using TTS)

Common dev commands
- Install deps (root): pnpm install
- Generate Prisma: npx prisma generate --schema=backend/prisma/schema.prisma
- Start frontend: pnpm -C frontend dev
- Start backend: pnpm -C backend dev
- Start worker: node -r ts-node/register ./backend/src/worker/embeddingsWorker.ts
- Lint frontend: pnpm -C frontend run lint

How ingest -> embeddings works (quick)
1. POST file (audio/text) to `/api/sources/ingest` (see [`backend/src/app/api/sources/ingest/route.ts:1`](backend/src/app/api/sources/ingest/route.ts:1)).
2. The route transcribes (if audio) and saves an encrypted source.
3. The route automatically enqueues an embeddings job (BullMQ). The worker creates embeddings via OpenRouter/OpenAI and upserts them to Qdrant.
4. Check job status: GET `/api/embeddings/status/:jobId` (see [`backend/src/app/api/embeddings/status/[id]/route.ts:1`](backend/src/app/api/embeddings/status/[id]/route.ts:1)).

Troubleshooting
- "prisma not found": ensure `npx prisma generate` ran in the backend folder and that `@prisma/client` is installed in `backend/package.json`.
- Worker errors: verify `REDIS_URL`, `bullmq` and `ioredis` are installed in `backend`.
- Qdrant errors: confirm `QDRANT_URL` / `QDRANT_API_KEY` and collection permissions.
- WebAuthn: use HTTPS in production and set `NEXTAUTH_URL` correctly. Passkey flows store a short challenge cookie and issue secure, HttpOnly session cookies.

Security & privacy reminders
- FIELD_ENCRYPTION_KEY must be treated like a secret and rotated via KMS in production.
- Voice cloning and TTS are gated behind explicit consent and samples are stored in object storage only after consent.