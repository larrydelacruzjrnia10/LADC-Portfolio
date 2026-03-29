import SectionHeader from './SectionHeader';
import ShowcaseCard from './ShowcaseCard';
import { showcaseItems } from '../data/siteContent';

function ShowcaseSection() {
  return (
    <section id="showcase" className="scroll-mt-28">
      <div className="section-shell">
        <div className="section-card overflow-hidden p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Work Showcase"
              title="Space for dashboards, forms, and screenshots that reinforce trust."
              description="Each card below is a polished placeholder for future screenshots or mockups. Larry can replace these later with real system views, report pages, and workflow captures."
            />

            <div className="grid gap-5 md:grid-cols-2">
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
