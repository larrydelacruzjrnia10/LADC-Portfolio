import ActionButton from './ActionButton';
import MockupFrame from './MockupFrame';
import StatCard from './StatCard';
import { heroContent, heroStats } from '../data/siteContent';

function HeroSection() {
  return (
    <section id="home" className="scroll-mt-28">
      <div className="section-shell pb-10 pt-10 sm:pb-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="section-tag">Virtual Assistance Portfolio</span>
            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
              {heroContent.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-brand-800 sm:text-xl sm:leading-9">
              {heroContent.title}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {heroContent.intro}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ActionButton href={heroContent.primaryCta.href} className="w-full sm:w-auto">
                {heroContent.primaryCta.label}
              </ActionButton>
              <ActionButton href={heroContent.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                {heroContent.secondaryCta.label}
              </ActionButton>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {heroStats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 inset-y-12 -z-10 rounded-full bg-gradient-to-br from-brand-200/40 to-mint-200/40 blur-3xl" />
            <div className="section-card soft-grid overflow-hidden p-4 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                    Workflow Snapshot
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Organized support for reports, data, and admin tasks</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-brand-300" />
                  <span className="h-3 w-3 rounded-full bg-mint-300" />
                  <span className="h-3 w-3 rounded-full bg-slate-200" />
                </div>
              </div>

              <MockupFrame
                label="Dashboard & Admin View"
                accent="brand"
                lines={['Reports status', 'Daily encoding progress', 'Service area tracking']}
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-lift">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-200">Focus Areas</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li>Data management</li>
                    <li>Dashboard support</li>
                    <li>Administrative workflows</li>
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-brand-100 bg-white/90 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-mint-700">Work Style</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Detail-oriented, reliable, and structured support for teams that need organized records and smooth day-to-day operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
