import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export function encryptCallback(callback: string) {
  return CryptoJS.AES.encrypt(callback, ENCRYPTION_KEY!).toString();
}

export function decryptCallback(encrypted: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY!);
  return bytes.toString(CryptoJS.enc.Utf8);
}
