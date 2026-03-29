function MockupFrame({ label, accent = 'brand', lines = [] }) {
  const accentMap = {
    brand: {
      glow: 'from-brand-500/25 to-brand-100/10',
      pill: 'bg-brand-100 text-brand-700',
      bar: 'bg-brand-500',
      card: 'border-brand-100',
    },
    mint: {
      glow: 'from-mint-500/25 to-mint-100/10',
      pill: 'bg-mint-100 text-mint-700',
      bar: 'bg-mint-500',
      card: 'border-mint-100',
    },
  };

  const currentAccent = accentMap[accent] ?? accentMap.brand;

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border bg-slate-950 p-4 text-white sm:p-5 ${currentAccent.card}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${currentAccent.glow}`} />
      <div className="relative">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <span
            className={`max-w-full rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${currentAccent.pill} sm:text-xs sm:tracking-[0.24em]`}
          >
            {label}
          </span>
          <div className="flex gap-2">
            <span className={`h-2.5 w-12 rounded-full ${currentAccent.bar}`} />
            <span className="h-2.5 w-8 rounded-full bg-white/20" />
            <span className="h-2.5 w-6 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <div className={`mb-3 h-2 w-10 rounded-full ${currentAccent.bar}`} />
                <div className="h-8 rounded-xl bg-white/10" />
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <div className="mb-3 h-2 w-8 rounded-full bg-white/30" />
                <div className="h-8 rounded-xl bg-white/10" />
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <div className="mb-3 h-2 w-12 rounded-full bg-white/30" />
                <div className="h-8 rounded-xl bg-white/10" />
              </div>
            </div>
            <div className="mt-4 h-28 rounded-[1.3rem] bg-white/10 p-4">
              <div className="flex h-full items-end gap-3">
                <span className="w-full rounded-t-2xl bg-white/20" style={{ height: '40%' }} />
                <span className={`w-full rounded-t-2xl ${currentAccent.bar}`} style={{ height: '75%' }} />
                <span className="w-full rounded-t-2xl bg-white/20" style={{ height: '55%' }} />
                <span className={`w-full rounded-t-2xl ${currentAccent.bar}`} style={{ height: '88%' }} />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
            {lines.map((line) => (
              <div key={line} className="rounded-2xl bg-white/10 p-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <span className="text-sm text-slate-100">{line}</span>
                  <span className={`h-2.5 w-16 rounded-full ${currentAccent.bar}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockupFrame;
