import fs from "node:fs/promises";
import path from "node:path";

export type Sized = { src: string; width: number; height: number };

const cache = new Map<string, Promise<Sized>>();

/**
 * Lit les dimensions d'une image de public/ au moment du build (côté serveur),
 * pour réserver l'espace exact et éviter les sauts de mise en page.
 */
export function imageSize(src: string): Promise<Sized> {
  const hit = cache.get(src);
  if (hit) return hit;
  const p = (async () => {
    try {
      const sharp = (await import("sharp")).default;
      const file = path.join(process.cwd(), "public", src);
      const meta = await sharp(await fs.readFile(file)).metadata();
      const rotated = (meta.orientation ?? 1) >= 5;
      const width = (rotated ? meta.height : meta.width) ?? 1200;
      const height = (rotated ? meta.width : meta.height) ?? 1200;
      return { src, width, height };
    } catch {
      return { src, width: 1200, height: 1200 };
    }
  })();
  cache.set(src, p);
  return p;
}

export async function imageSizes(srcs: string[]): Promise<Sized[]> {
  return Promise.all(srcs.map(imageSize));
}
