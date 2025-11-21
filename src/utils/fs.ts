import { basename, join, resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

const TEMP_DIR_NAME = '.temp-images';

export function ensureTempDir(): string {
  const tempDir = resolve(process.cwd(), TEMP_DIR_NAME);
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

export function copyImageToWorkspace(imagePath: string): string {
  const tempDir = ensureTempDir();
  const filename = basename(imagePath);
  const destPath = join(tempDir, filename);

  copyFileSync(imagePath, destPath);
  return destPath;
}
