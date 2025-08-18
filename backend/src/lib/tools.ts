/**
 * backend/src/lib/tools.ts
 *
 * Minimal tool implementations used by the assistant:
 * - upsertTrait
 * - logSource
 * - requestFollowups
 *
 * These helpers are small wrappers around Prisma and the crypto helpers.
 */

import { getPrisma } from "./prisma";
import { encryptAesGcm } from "./crypto";

export async function upsertTrait({
  userId,
  category,
  key,
  value_json,
  confidence = 0.6,
  completeness = 0.5,
  provenance = "assistant",
}: {
  userId: string;
  category: string;
  key: string;
  value_json: any;
  confidence?: number;
  completeness?: number;
  provenance?: string;
}) {
  const prisma = await getPrisma();
  // Store value_json directly (Postgres JSONB). We still produce an encrypted envelope for audit.
  const payload = JSON.stringify(value_json);
  const { iv, ciphertext, tag } = await encryptAesGcm(payload);

  const trait = await prisma.traits.upsert({
    where: {
      user_id_category_key: {
        user_id: userId,
        category,
        key,
      },
    },
    update: {
      value_json: value_json,
      confidence,
      completeness,
      provenance,
    },
    create: {
      user_id: userId,
      category,
      key,
      value_json: value_json,
      confidence,
      completeness,
      provenance,
    },
  });

  return { success: true, traitId: trait.id, encrypted: { iv, ciphertext, tag } };
}

export async function logSource({
  userId,
  type,
  title,
  content,
}: {
  userId: string;
  type: "survey" | "chat" | "file" | "link";
  title: string;
  content: string;
}) {
  const prisma = await getPrisma();
  const { iv, ciphertext, tag } = await encryptAesGcm(content);
  // Store ciphertext bytes in content_encrypted (bytea)
  const source = await prisma.sources.create({
    data: {
      user_id: userId,
      type,
      title,
      content_encrypted: Buffer.from(ciphertext, "base64"),
      iv,
    },
  });
  return { success: true, sourceId: source.id, meta: { iv, tag } };
}

export async function requestFollowups({ userId, maxQuestions = 3 }: { userId: string; maxQuestions?: number }) {
  const prisma = await getPrisma();
  const rows = await prisma.traits.groupBy({
    by: ["category"],
    where: { user_id: userId },
    _avg: { completeness: true },
    orderBy: { _avg: { completeness: "asc" } },
    take: 10,
  });

  const mapping: Record<string, string> = {
    Childhood: "Share a vivid childhood memory that matters to you.",
    Personality: "Name a personality trait you think defines you and why.",
    Career: "What's one meaningful accomplishment in your career?",
    Relationships: "Describe an important relationship and what you value about it.",
    Health: "What's one health habit you follow or want to improve?",
    Habits: "What's a daily habit that helps you or one you'd like to change?",
    Location: "Which place holds strong memories for you and why?",
    "Misc/Notes": "Any other notes or memories you'd like to keep?",
  };

  if (!rows || rows.length === 0) {
    return {
      followups: [
        "Tell me one childhood memory that shaped you.",
        "What are 2–3 traits people most notice about you?",
        "Describe a recent career milestone you're proud of.",
      ].slice(0, maxQuestions),
    };
  }

  const followups: string[] = [];
  for (const r of rows) {
    if (followups.length >= maxQuestions) break;
    const cat = (r.category as string) ?? "Misc/Notes";
    followups.push(mapping[cat] ?? `Tell me something about ${cat}.`);
  }
  return { followups };
}