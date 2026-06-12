import { SmoothScrollProvider } from '@/context/LocomotiveContext';
import { AmbientDotCanvas } from '@/components/AmbientDotCanvas';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { EducationSection } from '@/sections/EducationSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

function App() {
  return (
    <SmoothScrollProvider>
      <AmbientDotCanvas />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </SmoothScrollProvider>
  );
}

export default App;
