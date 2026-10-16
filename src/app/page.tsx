import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { WorkSection } from '@/components/sections/work';
import { SkillsSection } from '@/components/sections/skills';
import { EducationSection } from '@/components/sections/education';
import { ExploringSection } from '@/components/sections/exploring';
import { ResumeSection } from '@/components/sections/resume';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/layout/footer';
import { publicFileExists } from '@/lib/check-file';

export default function Home() {
  // Server-side file checks
  const hasProfilePhoto = true;
  const hasResumePdf = publicFileExists('resume/hasnain-resume.pdf');
  const hasSocialCvPreview = publicFileExists('images/social-cv-preview.png');
  const hasNavindiaPreview = publicFileExists('images/navindia-preview.png');

  return (
    <>
      <HeroSection hasProfilePhoto={hasProfilePhoto} />
      <AboutSection />
      <WorkSection
        hasSocialCvPreview={hasSocialCvPreview}
        hasNavindiaPreview={hasNavindiaPreview}
      />
      <SkillsSection />
      <EducationSection />
      <ExploringSection />
      <ResumeSection hasResumePdf={hasResumePdf} />
      <ContactSection />
      <Footer />
    </>
  );
}
