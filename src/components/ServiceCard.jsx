function ServiceCard({ title, description }) {
  return (
    <article className="section-card h-full p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-mint-100 text-brand-700">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path d="M6 12h12M12 6v12M5.5 5.5l13 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}

export default ServiceCard;
