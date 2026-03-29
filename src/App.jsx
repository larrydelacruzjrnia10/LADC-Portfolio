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
    <div className="app-shell relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(127,224,239,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(70,201,143,0.16),_transparent_24%),linear-gradient(180deg,_#f5fbff_0%,_#f9fffd_42%,_#eef8f5_100%)]" />
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
