import MockupFrame from './MockupFrame';

function ShowcaseCard({ title, description, accent }) {
  return (
    <article className="section-card overflow-hidden p-5 sm:p-6">
      <MockupFrame label={title} accent={accent} lines={['Monitoring view', 'Structured records', 'Reporting-ready layout']} />
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

export default ShowcaseCard;
