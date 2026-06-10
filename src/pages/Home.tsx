import { HeroSection } from '@/sections/HeroSection';
import { WhyModularSection } from '@/sections/WhyModularSection';
import { CasesSection } from '@/sections/CasesSection';
import { AboutProductionSection } from '@/sections/AboutProductionSection';
import { ContactFormSection } from '@/sections/ContactFormSection';

export function Home() {
  return (
    <main>
      <HeroSection />
      <WhyModularSection />
      <CasesSection />
      <AboutProductionSection />
      <ContactFormSection />
    </main>
  );
}
