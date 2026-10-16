# Chauhan Mohammed Hasnain — Premium Personal Portfolio

A cinematic, interactive personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Motion**, **Three.js** (`@react-three/fiber` + `@react-three/drei`), **Lenis**, and **GSAP ScrollTrigger**.

Designed to adapt seamlessly across every screen class—from compact mobile phones and foldables to ultra-wide displays—with zero horizontal overflow, fluid typography, and hardware-accelerated 3D interactions.

---

## 1. Quick Start

### Development
```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Linting & Production Build
```bash
# Run ESLint validation
npm run lint

# Compile production build (100% static prerender)
npm run build
```

---

## 2. Deploying to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Chauhan Mohammed Hasnain portfolio"
   git remote add origin https://github.com/chauhanhasnain-78-byte/<repo-name>.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Environment Variable in Vercel Project Settings:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://your-domain.vercel.app` (your actual production domain)
4. Deploy!

> **Important:** Never leave `NEXT_PUBLIC_SITE_URL` unset in production. It powers dynamic metadata, OpenGraph cards (`/opengraph-image`), XML sitemaps (`/sitemap.xml`), and SEO canonicals.

---

## 3. Adding Photos, Resume PDF & Screenshots

All assets are checked on the server at build/render time using `fs.existsSync`. When absent, graceful high-end fallbacks are displayed.

| Asset | Target Path | Fallback Behavior |
|---|---|---|
| **Profile Photo** | `public/images/profile-photo.jpg` | Interactive `HMH` monogram with 3D tilt, specular sweep & rim lighting |
| **Resume PDF** | `public/resume/hasnain-resume.pdf` | Only "View Resume ↗" link shown; "Download Resume ↓" appears once PDF exists |
| **Social-CV Preview** | `public/images/social-cv-preview.png` | Authentic typography & branding mockup in floating 3D browser frame |
| **NAV INDIA Preview** | `public/images/navindia-preview.png` | Authentic typography & branding mockup in floating 3D browser frame |
| **Personal Signature** | `public/images/signature.svg` | Generated SVG calligraphy write-on animation (`Hasnain`) |

> **Note:** After placing any of the above files into their respective folders in `public/`, **rebuild or redeploy** your project so Next.js static generation detects the new files.

---

## 4. Architecture & Technical Decisions

- **Single Source of Truth (`src/lib/constants/site.ts`):**
  All biographical information, section copy, links, projects, and skills are defined in one typed file. No strings are duplicated across components.
- **Persistent R3F 3D Canvas (`src/components/three/scene.tsx` & `canvas.tsx`):**
  Mounted once in the root layout via Next.js dynamic client import with SSR disabled. Content renders immediately over an ambient CSS gradient while the WebGL scene initializes seamlessly in the background.
- **Scroll-Driven Camera Journey:**
  Camera travels along a dynamic trajectory as the page scrolls, tilting and adjusting field-of-view for portrait vs. landscape orientations to guarantee the 3D centerpiece is never cropped. Lighting smoothly shifts from electric blue to soft violet across sections.
- **Signature Intro (`src/components/motion/signature-intro.tsx`):**
  Plays once per session using `sessionStorage`. Skippable at any time via click, tap, scroll, or keypress. Automatically disabled under `prefers-reduced-motion`.
- **Identity-First Hero Typography:**
  `CHAUHAN MOHAMMED HASNAIN` is the single `<h1>` on the page. Split into individual letter spans with `aria-label` for screen reader and SEO accessibility. Features mask-up reveal, subtle 3D depth outline, light sweep, and scroll parallax.
- **Floating 3D Browser Windows (`src/components/sections/work.tsx`):**
  Project showcases are rendered as interactive mini browser windows with three dots, address bar, reflective edge, and a hover "VIEW ↗" badge. The entire window links to the live site, with separate external links for Live Site and GitHub.
- **Lenis Inertial Scrolling + GSAP ScrollTrigger:**
  Smooth scrolling synchronized through a single animation frame loop, with touch-tailored smoothing on mobile devices and native keyboard accessibility.

---

## 5. Adjusting 3D Quality Settings

Quality settings are centralized in:
[`src/lib/constants/theme.ts`](src/lib/constants/theme.ts)

```typescript
export const QUALITY_TIERS = {
  high: {
    dpr: 2,
    particles: 500,
    postProcessing: true,
    geometryDetail: 64,
  },
  medium: {
    dpr: 1.5,
    particles: 200,
    postProcessing: true,
    geometryDetail: 32,
  },
  low: {
    dpr: 1,
    particles: 80,
    postProcessing: false,
    geometryDetail: 16,
  },
} as const;
```

Device tier is automatically detected based on hardware concurrency, device memory, and touch capabilities (`src/lib/utils.ts`), with live FPS degradation handled by `@react-three/drei`'s `PerformanceMonitor`.

---

## 6. License & Credits

Built for **Chauhan Mohammed Hasnain**, Mumbai, India.
All rights reserved © 2026.
