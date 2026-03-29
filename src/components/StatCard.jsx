function StatCard({ title, description }) {
  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-mint-100">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default StatCard;
