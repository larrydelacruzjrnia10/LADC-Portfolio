import ActionButton from './ActionButton';
import PortraitFrame from './PortraitFrame';
import StatCard from './StatCard';
import { heroContent, heroStats, profileContent } from '../data/siteContent';

function QuickLinkIcon({ icon }) {
  const commonClass = 'h-4 w-4 fill-none stroke-current stroke-[1.8]';

  if (icon === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className={commonClass}>
        <path d="M4 7.5h16v9H4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m5 8 7 6 7-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.32 1.08 2.88.82.09-.64.35-1.08.63-1.32-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.52 9.52 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.74-1.02 2.74-1.02.55 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (icon === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className={commonClass}>
        <path d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={commonClass}>
      <path d="M7 10h10M7 14h7M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroSection() {
  return (
    <section id="home" className="scroll-mt-28">
      <div className="section-shell pb-10 pt-10 sm:pb-12 sm:pt-16">
        <div className="section-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="section-tag">Virtual Assistant Portfolio</span>
              <p className="mt-6 text-xl font-semibold text-slate-100 sm:text-2xl">{heroContent.leadIn}</p>
              <h1 className="mt-2 max-w-4xl font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                {heroContent.name}
              </h1>
              <p className="mt-4 max-w-3xl text-2xl font-semibold leading-9 text-slate-200 sm:text-3xl sm:leading-[1.35]">
                {heroContent.titlePrefix}{' '}
                <span className="bg-gradient-to-r from-brand-300 to-mint-300 bg-clip-text text-transparent">
                  {heroContent.titleHighlight}
                </span>
              </p>
              <p className="mt-1 max-w-3xl text-lg font-medium leading-8 text-brand-100 sm:text-xl">
                {heroContent.titleSuffix}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{heroContent.intro}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                {heroContent.availability}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {heroContent.quickLinks.map((link) => {
                  const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:');

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={isExternal && !link.href.startsWith('mailto:') ? '_blank' : undefined}
                      rel={isExternal && !link.href.startsWith('mailto:') ? 'noreferrer' : undefined}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-400/35 bg-brand-400/10 text-brand-100 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-400/20"
                      aria-label={link.label}
                    >
                      <QuickLinkIcon icon={link.icon} />
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ActionButton href={heroContent.primaryCta.href} className="w-full sm:w-auto">
                  {heroContent.primaryCta.label}
                </ActionButton>
                <ActionButton
                  href={heroContent.hireMeCta.href}
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  {heroContent.hireMeCta.label}
                </ActionButton>
                <ActionButton href={heroContent.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                  {heroContent.secondaryCta.label}
                </ActionButton>
              </div>
            </div>

            <div className="relative">
              <div className="panel-inset p-6 sm:p-8">
                <PortraitFrame
                  src={profileContent.imageSrc}
                  alt={profileContent.imageAlt}
                  imageClassName="scale-[1.06]"
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-200">Focus</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li>Data management</li>
                      <li>Dashboard support</li>
                      <li>Admin coordination</li>
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-mint-200">Work Style</p>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      Reliable, organized, and comfortable with structured systems that need accurate daily follow-through.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
