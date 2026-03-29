import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';
import { services } from '../data/siteContent';

function ServicesSection() {
  const [featuredService, ...secondaryServices] = services;

  return (
    <section id="services" className="scroll-mt-28">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Services"
          title="Support services designed for businesses that need structure and consistency."
          description="Larry offers practical remote support that helps teams stay organized, informed, and efficient."
          align="center"
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          {featuredService ? <ServiceCard {...featuredService} featured /> : null}

          <div className="grid gap-6 md:grid-cols-2">
            {secondaryServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
