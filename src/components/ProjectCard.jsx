import MockupFrame from './MockupFrame';

function ProjectCard({
  title,
  description,
  features,
  mockupLabel,
  accent,
  github,
  demo,
  imageSrc,
  imageAlt,
  featured = false,
}) {
  return (
    <article
      className={`section-card overflow-hidden ${
        featured ? 'p-6 sm:p-8 lg:p-9' : 'flex h-full flex-col p-6 sm:p-7'
      }`}
    >
      <div className={featured ? 'lg:grid lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-8' : ''}>
        <div>
          {imageSrc ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.7)]">
              <img src={imageSrc} alt={imageAlt || title} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ) : (
            <MockupFrame label={mockupLabel} accent={accent} lines={features.slice(0, 3)} />
          )}
        </div>

        <div className={`${featured ? 'mt-6 lg:mt-0' : 'mt-6 flex flex-1 flex-col'}`}>
          {featured ? (
            <div className="mb-4 inline-flex rounded-full border border-brand-400/25 bg-brand-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-100">
              Featured Project
            </div>
          ) : null}

          <h3 className={`${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'} font-semibold text-white`}>{title}</h3>
          <p className={`mt-3 ${featured ? 'max-w-2xl text-base leading-8' : 'text-sm leading-7'} text-slate-300`}>
            {description}
          </p>

          <ul className={`mt-5 ${featured ? 'grid gap-3 sm:grid-cols-2' : 'space-y-3'}`}>
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-mint-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {github || demo ? (
            <div className={`flex flex-wrap gap-3 ${featured ? 'mt-8' : 'mt-6 pt-2'}`}>
              {github ? (
                <a className="button-secondary !px-4 !py-2" href={github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              {demo ? (
                <a className="button-primary !px-4 !py-2" href={demo} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
