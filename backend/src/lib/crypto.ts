// backend/src/lib/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from('01234567890123456789012345678901', 'hex'); // 32 bytes

export async function encrypt(text: string): Promise<{
  iv: string;
  encryptedData: string;
}> {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
}

export async function decrypt(ivHex: string, encryptedDataHex: string): Promise<string> {
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedDataHex, 'hex');
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}