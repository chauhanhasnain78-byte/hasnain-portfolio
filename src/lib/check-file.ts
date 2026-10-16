import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Check if a file exists in the public directory.
 * Only call this from Server Components or at build time.
 */
export function publicFileExists(relativePath: string): boolean {
  const fullPath = join(process.cwd(), 'public', relativePath);
  return existsSync(fullPath);
}
