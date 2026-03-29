import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ShowcaseSection from './components/ShowcaseSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { navigationLinks } from './data/siteContent';
import { useActiveSection } from './hooks/useActiveSection';

const sectionIds = navigationLinks.map((link) => link.href.slice(1));

function App() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,_#070d16_0%,_#0a1320_35%,_#0b111b_100%)]" />
      <div className="absolute left-[-8rem] top-[18rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-brand-500/20 blur-[130px]" />
      <div className="absolute bottom-[8rem] right-[-6rem] -z-10 h-[26rem] w-[26rem] rounded-full bg-mint-500/12 blur-[150px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_40%)]" />
      <Navbar links={navigationLinks} activeSection={activeSection} />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ShowcaseSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
