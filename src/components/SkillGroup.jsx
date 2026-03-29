function SkillGroup({ title, description, skills }) {
  return (
    <article className="section-card h-full p-6 sm:p-7">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-brand-100 bg-gradient-to-r from-brand-50 to-mint-50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default SkillGroup;
