# Legaci — Your story, in motion.

Production‑grade web app that models a user’s personality and memories, stores context in a vector DB, and presents an interactive 3D disco ball. Privacy‑first, passkey auth, RAG via Qdrant, and optional streaming TTS.

## Monorepo layout

- backend/ — Next.js 15 App Router APIs, auth, RAG, workers
- frontend/ — Next.js 15 UI, 3D disco ball (three.js/R3F), chat and inspector

## Prerequisites

- Node.js 20+
- pnpm 8+ (or npm)
- For local dev with Docker (optional): Docker Desktop

## Quick start (local development)

1) Install dependencies

```bash
pnpm -C backend install
pnpm -C frontend install
```

2) Create and fill environment file

- Copy backend/.env.example to backend/.env
- Fill the variables per the sections below. For local-only dev you can start with minimal values.

3) Start local services (optional, if not using managed providers)

- Postgres (Docker):

```bash
docker run --name legaci-pg -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=legaci -p 5432:5432 -d postgres:16
```

- Qdrant (Docker):

```bash
docker run -p 6333:6333 -p 6334:6334 -d qdrant/qdrant:latest
```

- Redis (Docker):

```bash
docker run -p 6379:6379 --name legaci-redis -d redis:7
```

4) Database push (create tables)

```bash
cd backend
npx prisma db push --schema=prisma/schema.prisma
cd ..
```

5) Run dev servers

- Backend API (port 3000 by default):

```bash
pnpm -C backend dev
```

- Frontend UI (port 3000 or 3001 depending on Next; if port conflicts, pass -p 3001):

```bash
pnpm -C frontend dev
```

- Embeddings worker (BullMQ): run with ts-node via npx

```bash
npx ts-node backend/src/worker/embeddingsWorker.ts
```

Ensure backend/.env is loaded in your shell before starting the worker (or use dotenvx). On Windows, you can run it in a terminal where you’ve set the env vars or use cross-env.

## Environment variables (backend/.env)

Use backend/.env.example as a reference. Minimal local-only configuration:

```env
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/legaci
FIELD_ENCRYPTION_KEY=REPLACE_WITH_64_HEX_CHARS
OPENROUTER_API_KEY=your_openrouter_key
CHAT_MODEL=anthropic/claude-3.5-sonnet
EMBEDDING_MODEL=text-embedding-3-large
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=legaci_vectors
QDRANT_VECTOR_SIZE=3072
REDIS_URL=redis://localhost:6379
RP_NAME=Legaci
RP_ID=localhost
```

Generate FIELD_ENCRYPTION_KEY with:

```bash
openssl rand -hex 32
```

Important: QDRANT_VECTOR_SIZE must match your embedding model:

- text-embedding-3-large → 3072
- text-embedding-3-small → 1536
- voyageai/voyage-2 → 1024

### Provider-specific guidance (production)

1) Postgres (Neon)

- Create a database in Neon
- Set DATABASE_URL to your Neon connection string (ensure sslmode=require)
- Run schema: cd backend && npx prisma db push --schema=prisma/schema.prisma

2) Qdrant Cloud

- Create a cluster and an API key
- Set QDRANT_URL (e.g., https://YOUR-ID.a.qdrant.cloud) and QDRANT_API_KEY
- Set QDRANT_COLLECTION (e.g., legaci_vectors)
- Set QDRANT_VECTOR_SIZE to match your embedding model

3) Redis (Upstash)

- Create a Redis database
- Use the Redis protocol URL (rediss://…); set REDIS_URL to this value
- Do NOT use UPSTASH_REDIS_REST_URL for BullMQ; it requires Redis protocol

4) OpenRouter (LLM + embeddings)

- Create an API key at https://openrouter.ai
- Set OPENROUTER_API_KEY
- Choose models:
  - CHAT_MODEL, e.g., anthropic/claude-3.5-sonnet or openai/gpt-4.1
  - EMBEDDING_MODEL, e.g., text-embedding-3-large or voyageai/voyage-2

5) ElevenLabs (TTS)

- Create an API key
- Set ELEVENLABS_API_KEY and optionally ELEVENLABS_VOICE_ID

6) WebAuthn

- Set NEXTAUTH_URL to your https base URL
- Set RP_ID to your domain (no scheme), e.g., app.example.com
- Set RP_NAME to “Legaci” or your product name

7) OAuth providers

- Google:
  - Authorized redirect URI: <NEXTAUTH_URL>/api/auth/oauth/google/callback
  - Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI

- GitHub:
  - Authorization callback URL: <NEXTAUTH_URL>/api/auth/oauth/github/callback
  - Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI

- Microsoft:
  - Redirect URI: <NEXTAUTH_URL>/api/auth/oauth/microsoft/callback
  - Set MS_CLIENT_ID, MS_CLIENT_SECRET, MS_REDIRECT_URI

## Running in production

1) Set all env vars in backend/.env (do not commit)

2) Build and start

```bash
pnpm -C backend build && pnpm -C backend start
```

3) Start the embeddings worker

- Option A (ts-node): npx ts-node backend/src/worker/embeddingsWorker.ts
- Option B (Node, compiled): use a separate build for the worker or tsx

4) Ensure Qdrant collection exists; the app auto-creates it on first upsert/search

5) Configure HTTPS and secure cookies (production sets Secure; SameSite=Strict automatically)

## Security notes

- Never commit backend/.env (repo already ignores it via backend/.gitignore)
- Use strong FIELD_ENCRYPTION_KEY (32-byte hex), rotate via KMS in real deployments
- Cookies are HttpOnly and SameSite=Strict; set NEXTAUTH_URL to https origin in production

## Testing

- Basic e2e tests via Playwright are scaffolded at tests/e2e
- Crypto unit tests can be added under tests/unit

## Troubleshooting

- Qdrant vector size mismatch → set QDRANT_VECTOR_SIZE to match EMBEDDING_MODEL
- BullMQ not connecting → ensure REDIS_URL uses redis/rediss protocol, not REST
- Whisper transcription errors → set OPENAI_API_KEY or disable the /api/sources/ingest flow

## License

MIT