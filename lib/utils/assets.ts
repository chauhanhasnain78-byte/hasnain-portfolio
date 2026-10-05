// lib/utils/assets.ts
// Server-only utilities for checking asset existence.
// Used by server components to conditionally render elements.

import fs from "fs";
import path from "path";

function getPublicPath(relativePath: string): string {
  return path.join(process.cwd(), "public", relativePath);
}

export function profilePhotoExists(): boolean {
  return fs.existsSync(getPublicPath("images/profile-photo.jpg"));
}

export function resumePdfExists(): boolean {
  return fs.existsSync(getPublicPath("resume/hasnain-resume.pdf"));
}

export function socialCvPreviewExists(): boolean {
  return fs.existsSync(getPublicPath("images/social-cv-preview.png"));
}
