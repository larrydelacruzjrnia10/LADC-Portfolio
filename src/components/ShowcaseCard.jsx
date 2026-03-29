import MockupFrame from './MockupFrame';

function ShowcaseCard({ title, description, accent, imageSrc, imageAlt, mockupLines }) {
  return (
    <article className="section-card overflow-hidden p-5 sm:p-6">
      {imageSrc ? (
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-[0_16px_35px_-28px_rgba(15,23,42,0.38)]">
          <img src={imageSrc} alt={imageAlt || title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : (
        <MockupFrame
          label={title}
          accent={accent}
          lines={mockupLines || ['Monitoring view', 'Structured records', 'Reporting-ready layout']}
        />
      )}
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

export default ShowcaseCard;
