import fs from "node:fs";
import path from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

const PUBLIC_DIR = path.join(process.cwd(), "public");

const readPngSize = (buffer: Buffer): ImageSize | null =>
  buffer.length >= 24 && buffer.toString("ascii", 12, 16) === "IHDR"
    ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
    : null;

/** JPEG: wymiary siedza w pierwszym segmencie SOF (znaczniki 0xC0-0xCF bez C4, C8, CC). */
const readJpegSize = (buffer: Buffer): ImageSize | null => {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const isSof =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isSof) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
};

/**
 * Wymiary zdjecia z /public (PNG i JPEG) - potrzebne, zeby zdjecia wstawione
 * w tresc wpisu szly przez next/image i nie przesuwaly ukladu przy ladowaniu.
 * Zwraca null dla innych formatow, adresow zewnetrznych i brakujacych plikow.
 */
export function getPublicImageSize(src: string): ImageSize | null {
  if (!src.startsWith("/")) return null;

  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(src));
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath)) return null;

  const buffer = fs.readFileSync(filePath);
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return readPngSize(buffer);
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return readJpegSize(buffer);
  return null;
}
