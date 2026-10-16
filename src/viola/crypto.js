// Canale Viola: the page and its audio are stored encrypted. The key is derived from the
// secret token in the URL (/#/v/<token>), so the repo never holds anything readable.
import { SALT, GATE } from './token.js';

const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const enc = new TextEncoder();

// A token is valid if the key it derives can open the marker (AES-GCM fails on a wrong key).
export async function tokenIsValid(token) {
  if (!token || !window.crypto?.subtle) return false;
  try {
    const key = await deriveKey(token);
    await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(GATE.iv) }, key, b64(GATE.ct));
    return true;
  } catch {
    return false;
  }
}

export async function deriveKey(token) {
  const base = await crypto.subtle.importKey('raw', enc.encode(token), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64(SALT), iterations: 100000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
  );
}

export async function openPage(token) {
  const { default: blob } = await import('./canale.enc.js');
  const key = await deriveKey(token);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(blob.iv) }, key, b64(blob.ct));
  return new TextDecoder().decode(plain);
}
