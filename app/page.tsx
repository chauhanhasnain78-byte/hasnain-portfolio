import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Work from '@/components/work/work';
import Skills from '@/components/skills/skills';
import Education from '@/components/education/education';
import Exploring from '@/components/exploring/exploring';
import Resume from '@/components/resume/resume';
import Contact from '@/components/contact/contact';
import { SITE, LINKS } from '@/lib/constants';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chauhan Mohammed Hasnain',
    jobTitle: 'Computer Science Student & Web Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'India'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Maharashtra College of Arts, Science & Commerce'
    },
    sameAs: [LINKS.socialCvRepo, LINKS.instagram, LINKS.linkedin].filter(Boolean),
    url: SITE.siteUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Education />
      <Exploring />
      <Resume />
      <Contact />
    </>
  );
}
