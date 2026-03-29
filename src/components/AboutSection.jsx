import SectionHeader from './SectionHeader';
import PortraitFrame from './PortraitFrame';
import { aboutContent, profileContent } from '../data/siteContent';

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="section-shell">
        <div className="section-card grid gap-8 p-6 sm:p-8 xl:grid-cols-[0.84fr_1.16fr] xl:items-center xl:gap-10">
          <div className="panel-inset flex flex-col justify-center p-6 sm:p-8">
            <PortraitFrame
              src={profileContent.imageSrc}
              alt={profileContent.imageAlt}
              className="max-w-[300px]"
              imageClassName="scale-[1.04]"
            />

            <div className="mt-6 rounded-[1.35rem] border border-brand-400/20 bg-brand-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">Professional Approach</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Detail-oriented support for teams that need consistency across data, reports, forms, and internal admin workflows.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <SectionHeader
              eyebrow={aboutContent.eyebrow}
              title={aboutContent.heading}
              description={aboutContent.paragraphs[0]}
            />

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-base leading-8 text-slate-300">{aboutContent.paragraphs[1]}</p>
            </div>

            <div className="grid gap-4">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:shadow-soft"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-400/15 text-mint-200">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
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
