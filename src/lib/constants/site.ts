// All content constants for the portfolio

export const SITE_CONFIG = {
  name: 'Chauhan Mohammed Hasnain',
  shortName: 'Hasnain Chauhan',
  logo: 'HASNAIN.',
  title: 'Computer Science Student & Web Developer',
  location: 'Mumbai, India',
  email: 'chauhanhasnain78@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  seo: {
    title: 'Chauhan Mohammed Hasnain — Computer Science Student & Web Developer',
    description: 'Portfolio of Chauhan Mohammed Hasnain, a Computer Science student and web developer from Mumbai exploring modern web development, AI tools and digital products.',
  },
  monogram: 'HMH',
  signatureName: 'Hasnain', // The text for the signature intro animation
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/chauhanhasnain-78-byte/Social-CV',
  instagram: 'https://www.instagram.com/has_nain1469/',
  email: 'mailto:chauhanhasnain78@gmail.com',
} as const;

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  work: 'work',
  skills: 'skills',
  education: 'education',
  resume: 'resume',
  contact: 'contact',
} as const;

export const HERO_CONTENT = {
  eyebrow: 'COMPUTER SCIENCE STUDENT • WEB DEVELOPER',
  tagline: 'I build digital experiences that solve real problems.',
  description: "I'm Hasnain Chauhan, a tech enthusiast exploring web development, AI tools and digital products.",
  cta: [
    { label: 'View My Work →', href: '#work' },
    { label: 'View Resume ↗', href: '#resume' },
  ],
} as const;

export const ABOUT_CONTENT = {
  heading: 'A little about me.',
  description: "I'm Hasnain Chauhan, a tech enthusiast actively engaged in web development projects like Social-CV and interested in exploring new AI tools. I enjoy participating in hackathons and experimenting with technology. Beyond coding, I enjoy gaming and spending great moments with friends at social gatherings.",
  infoCards: [
    { label: 'Degree', value: 'BSc Computer Science' },
    { label: 'Year', value: 'Third Year • Semester 5' },
    { label: 'Location', value: 'Mumbai, India' },
    { label: 'Graduating', value: '2027' },
  ],
} as const;

export const WHAT_I_DO = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive and interactive web experiences.',
  },
  {
    title: 'Application Development',
    description: 'Exploring mobile applications using Flutter and Dart.',
  },
  {
    title: 'AI & Technology',
    description: 'Exploring AI tools and finding practical ways technology can solve real problems.',
  },
] as const;

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  previewImage?: string; // filename in public/images/
  previewContent: {
    heading: string;
    subheading: string;
    cta?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'social-cv',
    title: 'Social-CV',
    description: 'An AI-powered CV/resume platform that helps users create professional resumes for free.',
    tags: ['HTML', 'CSS', 'JavaScript', 'AI', 'Web Technologies'],
    liveUrl: 'https://social-cv.vercel.app/',
    githubUrl: 'https://github.com/chauhanhasnain-78-byte/Social-CV',
    previewImage: 'social-cv-preview.png',
    previewContent: {
      heading: 'SOCIAL-CV',
      subheading: 'AI-Powered CV Builder',
      cta: 'Create your CV',
    },
  },
  {
    id: 'navindia-enterprises',
    title: 'NAV INDIA ENTERPRISES',
    description: 'A business website for an industrial products manufacturing, trading and export company based in Mumbai, with product categories and a request-a-quote flow.',
    tags: [], // Could not confirm technologies from repo
    liveUrl: 'https://navindia-enterprises.vercel.app/',
    githubUrl: 'https://github.com/chauhanhasnain-78-byte/navindia-enterprises',
    previewImage: 'navindia-preview.png',
    previewContent: {
      heading: 'NAV INDIA ENTERPRISES',
      subheading: 'You Specify. We Source. We Supply.',
    },
  },
];

export const SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'Flutter', 'Dart',
  'Node.js', 'MySQL', 'Git', 'GitHub',
] as const;

export const CURRENTLY_EXPLORING = [
  'AI Tools',
  'Modern Web Development',
  'Flutter',
  'UI/UX',
  'Digital Products',
  'Creative Development',
] as const;

export const EDUCATION = {
  institution: 'Maharashtra College of Arts, Science & Commerce',
  degree: 'BSc Computer Science',
  year: 'Third Year — Semester 5',
  graduation: 'Expected graduation 2027',
} as const;

export const RESUME_LINKS = {
  online: 'https://social-cv.vercel.app/p/3jEL2TuJz4bgfQHiYFlttCzZmSd2',
  pdf: 'hasnain-resume.pdf', // filename in public/resume/
} as const;

export const CONTACT_CONTENT = {
  heading: 'Have an idea? Let\'s build it.',
  description: "I'm always interested in exploring interesting ideas, projects and opportunities.",
  ctaLabel: 'Let\'s Talk ↗',
  ctaHref: 'mailto:chauhanhasnain78@gmail.com',
} as const;

export const FOOTER_CONTENT = {
  tagline: 'Building things with curiosity and code.',
  copyright: `© 2026 Chauhan Mohammed Hasnain`,
  location: 'Mumbai, India',
} as const;
