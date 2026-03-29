import { formatCurrency } from '../lib/posUtils';

function MetricCard({ label, value, currency = false, accent = 'red' }) {
  const accentMap = {
    red: 'from-red-500/15 to-red-100/60 text-red-700',
    amber: 'from-amber-400/25 to-amber-100/60 text-amber-700',
    slate: 'from-slate-400/20 to-slate-100/70 text-slate-700',
  };

  return (
    <article className="panel overflow-hidden p-5">
      <div className={`rounded-[1.5rem] bg-gradient-to-br p-5 ${accentMap[accent] || accentMap.red}`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em]">{label}</p>
        <p className="mt-3 font-display text-3xl font-extrabold text-slate-900">
          {currency ? formatCurrency(value) : value}
        </p>
      </div>
    </article>
  );
}

export default MetricCard;
