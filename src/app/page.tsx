import { Hero } from '@/components/sections/Hero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <ProjectsShowcase />
      <CTASection />
    </>
  );
}
