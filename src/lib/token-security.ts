import crypto from 'crypto';

const ENCRYPTION_SECRET = process.env.GOOGLE_OAUTH_ENCRYPTION_SECRET || process.env.CLERK_SECRET_KEY || 'creatoros-bharat-secure-calendar-oauth-salt-2026';
const ALGORITHM = 'aes-256-cbc';
// Derive a 32-byte key from the secret
const KEY = crypto.createHash('sha256').update(String(ENCRYPTION_SECRET)).digest();

/**
 * Encrypts sensitive tokens (e.g. access_token, refresh_token) before persisting to PostgreSQL.
 */
export function encryptToken(plainText: string): string {
  if (!plainText) return '';
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    // Fallback base64 encoding if crypto environment differs
    return `b64:${Buffer.from(plainText).toString('base64')}`;
  }
}

/**
 * Decrypts sensitive tokens retrieved from PostgreSQL.
 */
export function decryptToken(encryptedText: string): string {
  if (!encryptedText) return '';
  try {
    if (encryptedText.startsWith('b64:')) {
      return Buffer.from(encryptedText.slice(4), 'base64').toString('utf8');
    }

    const parts = encryptedText.split(':');
    if (parts.length !== 2) return encryptedText;

    const [ivHex, cipherHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(cipherHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
}
