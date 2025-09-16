// backend/src/lib/chunk.ts
// Simple text chunker with word-boundary aware splitting and configurable overlap.

export interface ChunkOptions {
  maxChars?: number;   // target max chars per chunk (soft limit)
  overlap?: number;    // overlapping chars between adjacent chunks
  minChars?: number;   // min acceptable chunk size before merging tail
}

/**
 * chunkText splits a large string into overlapping chunks suitable for embeddings.
 * - Attempts to break on sentence endings and word boundaries.
 * - Applies final merge for very small trailing chunk.
 */
export function chunkText(text: string, opts: ChunkOptions = {}): string[] {
  const maxChars = Math.max(200, opts.maxChars ?? 1000);
  const overlap = Math.max(0, Math.min(Math.floor(maxChars / 2), opts.overlap ?? 200));
  const minChars = Math.max(50, Math.min(maxChars / 3, opts.minChars ?? 200));

  const normalized = normalizeText(text);
  if (!normalized) return [];

  // Pre-split by paragraphs to preserve structure
  const paragraphs = normalized.split(/\n{2,}/g).map(p => p.trim()).filter(Boolean);
  const chunks: string[] = [];

  for (const para of paragraphs) {
    if (para.length <= maxChars) {
      chunks.push(para);
      continue;
    }
    // Sentence tokenize by simple regex
    const sentences = para.split(/(?<=[\.\!\?])\s+/g).filter(Boolean);
    let buffer = '';

    for (const s of sentences) {
      if (!buffer) {
        buffer = s;
        continue;
      }
      if ((buffer + ' ' + s).length <= maxChars) {
        buffer += ' ' + s;
      } else {
        // push current buffer and start new; apply overlap from the end of previous buffer
        chunks.push(buffer);
        buffer = withOverlap(buffer, s, overlap, maxChars);
      }
    }
    if (buffer) chunks.push(buffer);
  }

  // Final pass: split any remaining oversize chunks by words
  const normalizedChunks: string[] = [];
  for (const c of chunks) {
    if (c.length <= maxChars) {
      normalizedChunks.push(c);
      continue;
    }
    // Hard split by words
    const words = c.split(/\s+/g);
    let buf = '';
    for (const w of words) {
      const cand = buf ? buf + ' ' + w : w;
      if (cand.length > maxChars) {
        if (buf) normalizedChunks.push(buf);
        // start new with overlap from buf end
        buf = takeTail(buf, overlap) + (buf ? ' ' : '') + w;
        // if still too long (huge word), force push
        if (buf.length > maxChars * 1.5) {
          normalizedChunks.push(buf.slice(0, maxChars));
          buf = buf.slice(maxChars - overlap);
        }
      } else {
        buf = cand;
      }
    }
    if (buf) normalizedChunks.push(buf);
  }

  // Merge tiny tail
  if (normalizedChunks.length >= 2) {
    const last = normalizedChunks[normalizedChunks.length - 1];
    if (last.length < minChars) {
      const prev = normalizedChunks[normalizedChunks.length - 2];
      const merged = mergeWithOverlap(prev, last, overlap, maxChars);
      normalizedChunks.splice(normalizedChunks.length - 2, 2, merged);
    }
  }

  return normalizedChunks;
}

function normalizeText(text: string): string {
  return (text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00A0]{2,}/g, ' ')
    .trim();
}

function withOverlap(prev: string, nextStart: string, overlap: number, maxChars: number): string {
  const tail = takeTail(prev, overlap);
  let buf = tail ? `${tail} ${nextStart}` : nextStart;
  if (buf.length > maxChars) {
    // Trim from the front to respect maxChars if needed
    buf = buf.slice(buf.length - maxChars);
  }
  return buf;
}

function mergeWithOverlap(a: string, b: string, overlap: number, maxChars: number): string {
  const tail = takeTail(a, overlap);
  let merged = tail ? `${tail} ${b}` : `${a} ${b}`;
  if (merged.length > maxChars) {
    // Prefer to keep full b; take head from a
    const need = maxChars - (b.length + 1);
    const aHead = need > 0 ? a.slice(Math.max(0, a.length - need)) : '';
    merged = aHead ? `${aHead} ${b}` : b.slice(0, maxChars);
  }
  return merged;
}

function takeTail(s: string, overlap: number): string {
  if (!s) return '';
  if (overlap <= 0) return '';
  const start = Math.max(0, s.length - overlap);
  return s.slice(start).trimStart();
}