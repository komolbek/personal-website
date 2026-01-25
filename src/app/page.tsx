import { Hero } from '@/components/sections/Hero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ProjectsShowcase />
      <WhyChooseUs />
      <PartnersSection />
      <CTASection />
    </>
  );
}
