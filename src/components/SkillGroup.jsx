function SkillGroup({ title, description, skills, featured = false, className = '' }) {
  return (
    <article className={`section-card h-full ${featured ? 'p-7 sm:p-8' : 'p-6 sm:p-7'} ${className}`.trim()}>
      {featured ? (
        <div className="mb-4 inline-flex rounded-full border border-brand-400/25 bg-brand-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-100">
          Core Skill Set
        </div>
      ) : null}
      <h3 className={`${featured ? 'text-2xl sm:text-[2rem]' : 'text-xl'} font-semibold text-white`}>{title}</h3>
      <p className={`mt-3 ${featured ? 'max-w-2xl text-base leading-8' : 'text-sm leading-7'} text-slate-300`}>
        {description}
      </p>

      <div className={`mt-6 ${featured ? 'grid gap-3 sm:grid-cols-2' : 'flex flex-wrap gap-3'}`}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-brand-400/25 bg-brand-400/10 px-4 py-2 text-sm font-medium text-brand-100 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-400/18"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default SkillGroup;
