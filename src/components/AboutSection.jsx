import SectionHeader from './SectionHeader';
import { aboutContent } from '../data/siteContent';

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="section-shell">
        <div className="section-card grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_0.9fr]">
          <SectionHeader
            eyebrow={aboutContent.eyebrow}
            title={aboutContent.heading}
            description={aboutContent.paragraphs[0]}
          />

          <div className="grid gap-5">
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50/70 p-6">
              <p className="text-base leading-8 text-slate-700">{aboutContent.paragraphs[1]}</p>
            </div>

            <div className="grid gap-4">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.4rem] border border-slate-200 bg-white/90 p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-700">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
