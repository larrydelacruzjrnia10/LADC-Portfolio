import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';
import { services } from '../data/siteContent';

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Services"
          title="Support services designed for businesses that need structure and consistency."
          description="Larry offers practical remote support that helps teams stay organized, informed, and efficient."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
