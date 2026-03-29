import SectionHeader from './SectionHeader';
import ShowcaseCard from './ShowcaseCard';
import { showcaseItems } from '../data/siteContent';

function ShowcaseSection() {
  return (
    <section id="showcase" className="scroll-mt-28">
      <div className="section-shell">
        <div className="section-card overflow-hidden p-8 sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:gap-10">
            <SectionHeader
              eyebrow="Work Showcase"
              title="Space for dashboards, forms, and screenshots that reinforce trust."
              description="These sample visuals show how Larry can present polished system views, reporting screens, and workflow interfaces in a client-facing portfolio."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {showcaseItems.map((item) => (
                <ShowcaseCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection;
