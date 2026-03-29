function ServiceCard({ title, description, featured = false, className = '' }) {
  return (
    <article className={`section-card h-full ${featured ? 'p-7 sm:p-8' : 'p-6 sm:p-7'} ${className}`.trim()}>
      {featured ? (
        <div className="mb-4 inline-flex rounded-full border border-brand-400/25 bg-brand-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-100">
          Core Service
        </div>
      ) : null}
      <div
        className={`mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400/20 to-mint-400/20 text-brand-100 ${
          featured ? 'h-14 w-14' : 'h-12 w-12'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M6 12h12M12 6v12M5.5 5.5l13 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className={`${featured ? 'text-2xl sm:text-[2rem]' : 'text-xl'} font-semibold text-white`}>{title}</h3>
      <p className={`mt-3 ${featured ? 'max-w-2xl text-base leading-8' : 'text-sm leading-7'} text-slate-300`}>
        {description}
      </p>
    </article>
  );
}

export default ServiceCard;
