/**
* backend/src/lib/crypto.ts
*
* Field-level AES‑GCM helpers and small binary helpers used elsewhere.
* - Uses a server master key from process.env.FIELD_ENCRYPTION_KEY (hex, 32 bytes).
* - Exports encryptAesGcm / decryptAesGcm which include authTag in output.
* - Exports base64ToBuffer / bufferToBase64 helpers used by WebAuthn flows.
*
* IMPORTANT: In production the master key should be provided by a KMS and rotated.
*/
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const ALGO = 'aes-256-gcm';
const IV_BYTES = 12;
const TAG_BYTES = 16;

function getMasterKey(): Buffer {
 const hex = process.env.FIELD_ENCRYPTION_KEY || '';
 if (!hex || hex.length !== 64) {
   throw new Error(
     'FIELD_ENCRYPTION_KEY must be set (32 bytes hex string). Example: export FIELD_ENCRYPTION_KEY="$(openssl rand -hex 32)"'
   );
 }
 return Buffer.from(hex, 'hex');
}

/**
* Encrypt plaintext -> returns base64 strings for components.
*/
export async function encryptAesGcm(plaintext: string): Promise<{
 iv: string; // base64
 ciphertext: string; // base64
 tag: string; // base64
}> {
 const key = getMasterKey();
 const iv = randomBytes(IV_BYTES);
 const cipher = createCipheriv(ALGO, key, iv, { authTagLength: TAG_BYTES });
 const ciphertext = Buffer.concat([cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final()]);
 const tag = cipher.getAuthTag();
 return {
   iv: iv.toString('base64'),
   ciphertext: ciphertext.toString('base64'),
   tag: tag.toString('base64'),
 };
}

/**
* Decrypt components (base64) -> plaintext
*/
export async function decryptAesGcm(ivB64: string, ciphertextB64: string, tagB64: string): Promise<string> {
 const key = getMasterKey();
 const iv = Buffer.from(ivB64, 'base64');
 const ciphertext = Buffer.from(ciphertextB64, 'base64');
 const tag = Buffer.from(tagB64, 'base64');
 const decipher = createDecipheriv(ALGO, key, iv, { authTagLength: TAG_BYTES });
 decipher.setAuthTag(tag);
 const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
 return plaintext.toString('utf8');
}

/**
* Helpers for WebAuthn / binary conversions
*/
export function base64ToBuffer(b64: string): Buffer {
 // Accept URL-safe base64 as well
 b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
 const pad = b64.length % 4;
 if (pad === 2) b64 += '==';
 else if (pad === 3) b64 += '=';
 return Buffer.from(b64, 'base64');
}

export function bufferToBase64(buf: Buffer): string {
 return buf.toString('base64');
}