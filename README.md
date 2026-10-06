# Chauhan Mohammed Hasnain — Personal Portfolio

A production-ready, dark, cinematic, single-page personal portfolio for **Chauhan Mohammed Hasnain**, Computer Science Student & Web Developer based in Mumbai, India.

Built with **Next.js (App Router)**, **TypeScript (strict)**, **Tailwind CSS**, and **Motion (`motion/react`)**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm (or pnpm / yarn)

### Running Locally
```bash
# Navigate to portfolio directory
cd portfolio

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Verifying Production Build & Linting
```bash
# Run ESLint
npm run lint

# Run production build & static export check
npm run build

# Start production server locally
npm run start
```

---

## 🖼️ Replacing Your Assets

The portfolio includes an automated asset-detection system powered by server-side checks. You do not need to modify code to enable these assets—simply place the files in the appropriate folders and redeploy.

### 1. Profile Photo
- **File path:** `public/images/profile-photo.jpg`
- **Fallback behavior:** If absent, an elegant, refined geometric monogram **`HMH`** is displayed with zero layout shift.
- **Tips for best results:**
  - Recommended aspect ratio: 4:5 or 1:1 (square).
  - File size: under 500 KB (JPEG / WebP).
  - High resolution, clean background or studio lighting.
  - No code changes needed—simply drop the file into `public/images/` and redeploy.

### 2. Resume PDF
- **File path:** `public/resume/hasnain-resume.pdf`
- **Behavior:**
  - The primary **"View Resume ↗"** button is always visible and points directly to your verified online CV on Social-CV.
  - The secondary **"Download Resume ↓"** button **only appears if** `hasnain-resume.pdf` exists in `public/resume/`.
  - When the PDF is absent, the download button is completely omitted (no broken links, disabled states, or "coming soon" placeholders).
- ⚠️ **Privacy Tip:** When preparing your public resume PDF, avoid including private personal information such as home address, personal phone number, or government ID numbers.

### 3. Social-CV Preview Screenshot (Optional)
- **File path:** `public/images/social-cv-preview.png`
- **Behavior:**
  - If absent: Renders an abstract, controlled visual preview inside the interactive 3D browser frame.
  - If present: Displays the actual screenshot within the realistic browser chrome.

---

## 📬 Connecting the Contact Form

The contact form is pre-configured with a dual-mode setup in `lib/contact.ts`:

### Default Behavior (Zero Configuration)
- Client-side validation checks for valid name, email, and message.
- A hidden honeypot field prevents automated spam.
- Clicking **"Send Message"** pre-fills and opens a `mailto:` link directed to `chauhanhasnain78@gmail.com`.
- **Honesty:** The UI never displays a fake "Message sent" confirmation when opening email clients.

### Connecting to an External Form Backend
To connect to an external provider (such as Formspree, Web3Forms, or Resend):

1. **Option A: Formspree**
   - Create a form at [formspree.io](https://formspree.io).
   - Add your endpoint to `.env.local`:
     ```env
     NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
     ```
   - In `lib/contact.ts`, uncomment the API adapter fetch block.

2. **Option B: Web3Forms**
   - Obtain an access key from [web3forms.com](https://web3forms.com).
   - In `lib/contact.ts`, pass `access_key` in the POST body.

---

## 🎨 Design System & Tokens

The site utilizes a curated dark cinematic palette:

| Token | Hex / Value | Description |
|---|---|---|
| `bg` | `#050505` | Deep cinematic black background |
| `bg-2` | `#0A0A0C` | Subtle secondary background |
| `surface` | `#101013` | Card & container surface |
| `surface-elevated` | `#151519` | Elevated elements surface |
| `text` | `#F5F5F5` | Primary high-contrast text |
| `text-secondary` | `#92929A` | Secondary readable text (>= 4.5:1 contrast) |
| `text-muted` | `#62626B` | Decorative / large metadata text |
| `accent` | `#2F6BFF` | Electric blue focus, active indicators, CTAs |
| `accent-2` | `#7C5CFF` | Violet gradient accent |
| `border` | `rgba(255,255,255,0.08)` | Subtle structural divider lines |

---

## ⚡ 3D Cinematic Motion & Performance System

- **3D Engine:** Powered by **Three.js**, **@react-three/fiber**, and **@react-three/drei** with custom shader transmission glass centerpiece, depth particle systems, and atmospheric lighting.
- **Smooth Inertial Scroll:** Powered by **Lenis** unified with **GSAP ScrollTrigger** on a shared requestAnimationFrame loop with keyframed 3D camera journeys.
- **Single Quality Config:** All 3D parameters (DPR caps, particle counts, geometry detail, camera FOV, and mobile thresholds) can be tuned in `lib/config/quality.ts`.
- **Adaptive Quality:** Uses drei `PerformanceMonitor` and `AdaptiveDpr` to automatically adjust resolution and particles if frame rates fluctuate.
- **Accessibility & Fallbacks:** Automatically falls back to a calm CSS gradient if WebGL is unavailable or if `prefers-reduced-motion` is active.
- **Zero Layout Shifts:** Background 3D canvas is fixed behind real semantic DOM elements, ensuring SEO and accessibility remain 100% unaffected.

---

## ⚙️ Environment Variables

Create `.env.local` or configure in Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://hasnain-portfolio-orpin.vercel.app
```

Used by Next.js metadata, Open Graph URL, Twitter cards, sitemap (`sitemap.xml`), and robots (`robots.txt`).

---

## 🚢 Deploying to Vercel

1. Push your branch to GitHub:
   ```bash
   git add .
   git commit -m "feat: elite 3d cinematic portfolio upgrade"
   git push origin elite-3d
   ```
2. In your Vercel Dashboard for `hasnain-portfolio`:
   - Add environment variable `NEXT_PUBLIC_SITE_URL` = `https://hasnain-portfolio-orpin.vercel.app`
3. Merge `elite-3d` into `main` (or deploy directly from `elite-3d`). Vercel will build and deploy automatically!
