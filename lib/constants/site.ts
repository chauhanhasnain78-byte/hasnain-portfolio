// lib/constants/site.ts
// Single source of truth for all site content.
// No URL, label, or copy should be hardcoded in components.

export const SITE = {
  name: "Chauhan Mohammed Hasnain",
  brand: "HASNAIN.",
  introPerson: "Hasnain Chauhan",
  title: "Computer Science Student & Web Developer",
  email: "chauhanhasnain78@gmail.com",
  location: "Mumbai, India",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasnain-portfolio-orpin.vercel.app",
  description:
    "Portfolio of Chauhan Mohammed Hasnain, a Computer Science student and web developer from Mumbai exploring modern web development, AI tools and digital products.",
  tagline: "Building things with curiosity and code.",
} as const;

export const LINKS = {
  socialCvLive: "https://social-cv.vercel.app/",
  socialCvRepo: "https://github.com/chauhanhasnain-78-byte/Social-CV",
  onlineCv:
    "https://social-cv.vercel.app/p/3jEL2TuJz4bgfQHiYFlttCzZmSd2",
  instagram: "https://www.instagram.com/has_nain1469/",
  linkedin: "", // optional — render nothing unless filled
} as const;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "instagram" | "email" | "linkedin";
  external: boolean;
  ariaLabel: string;
}

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: LINKS.socialCvRepo,
    icon: "github",
    external: true,
    ariaLabel: "GitHub, opens in a new tab",
  },
  {
    label: "Instagram",
    href: LINKS.instagram,
    icon: "instagram",
    external: true,
    ariaLabel: "Instagram, opens in a new tab",
  },
  {
    label: "Email",
    href: `mailto:${SITE.email}`,
    icon: "email",
    external: false,
    ariaLabel: "Send email",
  },
  // LinkedIn only if filled
  ...(LINKS.linkedin
    ? [
        {
          label: "LinkedIn",
          href: LINKS.linkedin,
          icon: "linkedin" as const,
          external: true,
          ariaLabel: "LinkedIn, opens in a new tab",
        },
      ]
    : []),
];

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  previewImage?: string; // optional path in public/images/
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "social-cv",
    title: "Social-CV",
    description:
      "An AI-powered CV/resume platform that helps users create professional resumes for free.",
    tags: ["HTML", "CSS", "JavaScript", "AI", "Web technologies"],
    liveUrl: LINKS.socialCvLive,
    repoUrl: LINKS.socialCvRepo,
    previewImage: "social-cv-preview.png",
    featured: true,
  },
];

export interface Skill {
  name: string;
  icon: string; // Lucide icon name or custom SVG identifier
}

export const SKILLS: Skill[] = [
  { name: "HTML", icon: "code" },
  { name: "CSS", icon: "palette" },
  { name: "JavaScript", icon: "file-code-2" },
  { name: "Flutter", icon: "smartphone" },
  { name: "Dart", icon: "terminal" },
  { name: "Node.js", icon: "server" },
  { name: "MySQL", icon: "database" },
  { name: "Git", icon: "git-branch" },
  { name: "GitHub", icon: "github" },
];

export const EDUCATION = {
  institution: "Maharashtra College of Arts, Science & Commerce",
  degree: "Bachelor of Science in Computer Science",
  status: "Third Year — Semester 5",
  graduation: "2027",
} as const;

export const EXPLORING = [
  "AI tools",
  "Modern web development",
  "Flutter",
  "UI/UX",
  "Digital products",
  "Creative development",
] as const;

export const SERVICES = [
  {
    title: "Web Development",
    description:
      "Building modern, responsive and interactive web experiences.",
    icon: "globe",
  },
  {
    title: "Application Development",
    description:
      "Exploring mobile applications using Flutter and Dart.",
    icon: "smartphone",
  },
  {
    title: "AI & Technology",
    description:
      "Exploring AI tools and finding practical ways technology can solve real problems.",
    icon: "sparkles",
  },
] as const;

export const ASSETS = {
  profilePhoto: "/images/profile-photo.jpg",
  resumePdf: "/resume/hasnain-resume.pdf",
  socialCvPreview: "/images/social-cv-preview.png",
} as const;
