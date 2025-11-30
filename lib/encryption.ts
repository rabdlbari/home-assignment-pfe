import crypto from "crypto";

const algorithm = "aes-256-gcm";
const secret = crypto
  .createHash("sha256")
  .update(process.env.COOKIE_SECRET || "default_secret")
  .digest(); // 32 bytes

export function encryptCookie(value: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString(
    "hex"
  )}`;
}

export function decryptCookie(encrypted: string) {
  const [ivHex, tagHex, dataHex] = encrypted.split(":");
  if (!ivHex || !tagHex || !dataHex) throw new Error("Invalid cookie format");

  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const data = Buffer.from(dataHex, "hex");

  if (iv.length !== 16) throw new Error("IV length invalid");

  const decipher = crypto.createDecipheriv(algorithm, secret, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString("utf8");
}
