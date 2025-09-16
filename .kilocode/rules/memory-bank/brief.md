You are building “Legaci,” a production-grade web app that models a user’s personality and memories, stores context in a vector DB, and presents an interactive 3D disco ball where each tile represents a trait/category. Use OpenRouter for LLM calls, secure passkey login, and optional voice cloning. Produce complete, runnable code and setup instructions.

BRAND
- Product name: Legaci
- Tagline: “Your story, in motion.”
- Voice: warm, respectful, privacy‑first, clear.
- Color tokens (Tailwind/custom theme):
  - bg: #0B0F14
  - surface: #0F172A
  - textPrimary: #E5E7EB
  - textSecondary: #9CA3AF
  - primary: #5B5BD6
  - accent: #00C2C7
  - accent2: #E254FF
- Category hues for tiles:
  - Childhood: #60A5FA
  - Personality: #34D399
  - Career: #F59E0B
  - Relationships: #F472B6
  - Health: #84CC16
  - Habits: #A78BFA
  - Location: #22D3EE
  - Misc/Notes: #94A3B8
- Apply brand consistently: UI theme, disco ball base hue (primary), tile hues by category, audio visualizer gradient (primary → accent → accent2), SEO metadata (“Legaci”), and SVG logo assets (wordmark + logomark).

REQUIREMENTS SUMMARY
- Landing/login with WebAuthn passkeys (passwordless). MFA fallback optional.
- Main screen: center 3D disco ball of square mirror tiles.
  - Slow auto‑rotation; user can orbit/drag to rotate.
  - Each tile maps to a category (above). Tiles with data protrude outward by completeness (0..1).
  - Color transition: base disco hue (primary) → category hue when data exists; subtle time‑based shimmer.
  - Hover highlights; click opens Inspector with references, confidence, edit/add actions.
- Circular 2D audio visualizer ring around the disco ball, reactive to TTS playback using brand gradient.
- Left panel: Agent Chat (OpenRouter, streaming). Modes: “Fill gaps” (target sparse categories) and “Normal.” Toggle: “Speak replies in my voice.”
- Right panel: Inspector for selected tile; show traits, completeness, sources, suggested follow‑ups.
- Data & RAG
  - Postgres for app data; Qdrant Cloud for vectors; object storage for voice samples.
  - APIs to upsert traits, list by category, ingest sources (survey answers, chats, files/links).
  - RAG: chunk → embed via OpenRouter → store in Qdrant (metadata: user_id, category, source_id, timestamp) → retrieve top‑k with filters and optional rerank.
  - Persona synthesis: rolling “persona summary” + “style guide” updated after sessions.
- LLM (OpenRouter)
  - Streaming responses; tool calls for upsert_trait, log_source, request_followups.
  - Default chat model: anthropic/claude-3.5-sonnet or openai/gpt-4.1; embeddings: voyageai/voyage-2 or text-embedding-3-large.
- Voice
  - Integrate streaming TTS (ElevenLabs or PlayHT). Gate behind explicit consent.
  - Route streamed audio to Web Audio API; connect AnalyserNode for the visualizer.
  - Optional STT (Whisper) for capturing user answers.
- Security & privacy (brand-critical)
  - WebAuthn passkeys via @simplewebauthn. Sessions: HttpOnly, Secure, SameSite=strict cookies.
  - Field‑level encryption (AES‑GCM envelope; keys via KMS). Redact PII where possible.
  - Optional client‑side E2EE vault for ultra‑sensitive notes (passphrase‑derived key; ciphertext only server‑side).
  - Consent flow for voice cloning with clear language; easy opt‑out; export/delete my data endpoints.
- Accessibility & mobile
  - Keyboard support for rotating/selecting tiles. High‑contrast mode.
  - Responsive: ball scales; panels become drawers on mobile.
- Performance
  - 1k–4k tiles via InstancedMesh + custom shaders. Throttle raycasting. Maintain 60 fps on mid‑range laptops.
  - Visualizer uses Canvas 2D, DPR aware, 30–60 fps.

ARCHITECTURE & STACK
- Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS (with brand tokens), Framer Motion, Zustand, TanStack Query.
- 3D: three.js + React Three Fiber + drei; custom GLSL shaders (protrusion + color/fresnel shimmer); OrbitControls; Raycaster with instanceId picking.
- Audio: Web Audio API; Canvas 2D ring visualizer (primary → accent → accent2 gradient).
- Backend: Next.js Route Handlers; Node 20+; Zod for validation; BullMQ + Upstash Redis for embedding/TTS jobs.
- DB: Postgres (Neon/Supabase); Qdrant Cloud; Object storage (R2/Supabase) for voice samples.
- Security libs: @simplewebauthn/*; jose; argon2; node:crypto (AES‑GCM); helmet; rate-limiter-flexible.
- LLM: OpenRouter SDK; embeddings via OpenRouter.
- Telemetry: Sentry; PostHog (opt-in).

DATA MODEL (Postgres)
- users(id, email, created_at)
- credentials(id, user_id, webauthn_credential_id, public_key, sign_count, created_at)
- sessions(id, user_id, hashed_token, user_agent, ip_hash, created_at, expires_at, revoked_at)
- profiles(user_id, display_name, timezone, theme_color, updated_at)
- traits(id, user_id, category, key, value_json, confidence float, completeness float, provenance text, updated_at)
- sources(id, user_id, type enum(survey,chat,file,link), title, content_encrypted bytea, created_at)
- messages(id, user_id, role enum(system,user,assistant), content_encrypted bytea, audio_url text, created_at)
- embeddings(id, user_id, vector_ref text, source_id, category, chunk_meta jsonb, created_at)
- voice_profiles(id, user_id, provider, voice_id, consent_signed_at timestamp, sample_meta jsonb)

API SURFACE (protected)
- POST /api/auth/register-passkey
- POST /api/auth/login-passkey
- POST /api/traits/upsert { category, key, value_json, confidence, completeness, provenance }
- GET /api/traits?category=Career
- POST /api/sources/ingest { type, title, content (plaintext) } -> encrypt, embed, Qdrant
- POST /api/chat { messages[], mode: "fill-gaps" | "normal", speak:boolean } -> stream tokens; optional TTS
- POST /api/voice/consent { accepted:boolean, sample_ids[] }
- POST /api/voice/speak { text } -> stream audio
- GET /api/export; DELETE /api/account

LLM PROMPTING & TOOLS
- System prompt sections for the in‑app assistant: safety; persona summary; Legaci style guide (warm, privacy‑first); retrieval context; voice cloning consent state.
- Tools/functions:
  - upsert_trait({category,key,value_json,confidence,provenance})
  - request_followups({category,gaps[]})
  - log_source({type,title,content})
- “Fill gaps” planner: propose 1–3 concise questions for lowest completeness/confidence categories; respect user boundaries.

3D DISCO BALL IMPLEMENTATION
- Geometry: spherical grid of square plates; InstancedMesh with per‑instance attributes:
  - aCategory (int), aCompleteness (float), aSelected (float)
- Vertex shader: offset along normal by protrusion = smoothstep(0,1,aCompleteness) * maxOffset.
- Fragment shader: mix(primaryColor, categoryColor[aCategory], aCompleteness); subtle time‑based hue shift; optional Fresnel sparkle.
- Interaction: OrbitControls; autorotate; raycast instanceId; hover and select states; open Inspector.
- Performance: 1–4k tiles; DynamicDrawUsage; throttle pointermove to ~30 Hz; dispose resources.

AUDIO VISUALIZER
- Create AudioContext on first user interaction.
- Connect TTS stream -> GainNode -> AnalyserNode; draw radial bars around the ball using gradient (primary→accent→accent2).

BRANDING DELIVERABLES
- Tailwind theme extension with the color tokens above.
- /public/brand/legaci-wordmark.svg (Plus Jakarta Sans/Clash Display), /public/brand/legaci-mark.svg (faceted “L”).
- Favicon and app icons generated from the logomark; dark/light variants.
- SEO/OpenGraph defaults: title “Legaci — Your story, in motion.”; theme color primary; social preview with logomark and gradient.

DELIVERABLES
- Next.js monorepo with:
  - app/, components/ (DiscoBall.tsx, VisualizerCanvas.tsx, ChatPanel.tsx, InspectorPanel.tsx)
  - lib/ (openrouter.ts, qdrant.ts, embeddings.ts, crypto.ts, auth.ts)
  - app/api/* route handlers
  - prisma or drizzle schema + migrations
  - worker for embeddings (BullMQ)
  - Tailwind config with Legaci tokens
  - brand SVG assets and metadata
- .env.example with all keys; README with setup and deploy notes
- Basic tests for auth/crypto; lint/format configured

ACCEPTANCE CRITERIA
- UI reflects Legaci brand: colors, typography, logos, and copy.
- Disco ball performs at 60 fps with ~2k tiles; colors and protrusions reflect category completeness using specified hues.
- Visualizer animates with the brand gradient during TTS.
- Passkey login works; data at rest is encrypted; export/delete endpoints exist.
- Chat streams; “fill gaps” mode asks targeted questions; voice cloning gated by consent.
- Responsive, accessible, no severe console errors; tests and lints pass.

You are being deployed to an on-going project so some files have already been made but may be wrong / inconsistent with the other files. If you require documentation please use context7 to pull the documentation up. Always look at the contents of a file first and do not blindly write_to_file, if possible use apply_diff.

Before beggining this project please have a thorough  look through the files in the project.