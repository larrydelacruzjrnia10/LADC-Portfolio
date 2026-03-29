import MockupFrame from './MockupFrame';

function ProjectCard({ title, description, features, mockupLabel, accent, github, demo }) {
  return (
    <article className="section-card flex h-full flex-col overflow-hidden p-6 sm:p-7">
      <MockupFrame label={mockupLabel} accent={accent} lines={features.slice(0, 3)} />

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

        <ul className="mt-5 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-mint-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {github || demo ? (
          <div className="mt-6 flex flex-wrap gap-3 pt-2">
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
    </article>
  );
}

export default ProjectCard;
