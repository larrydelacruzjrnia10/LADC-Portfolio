function TopBar({ currentView, onChangeView, currentRole, onChangeRole, isOffline }) {
  const views = [
    { id: 'cashier', label: 'Cashier POS' },
    { id: 'kitchen', label: 'Kitchen Display' },
    { id: 'admin', label: 'Admin Dashboard' },
  ];

  return (
    <header className="panel mb-6 overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="soft-label">Portfolio Sample Project</div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-slate-950">QuickBite Fast-Food POS</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            A realistic cashier, kitchen, and admin workflow demo built as a portfolio-ready full-stack POS system.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2 rounded-full bg-slate-100 p-2">
            {views.map((view) => {
              const disabled = view.id === 'admin' && currentRole !== 'admin';
              const active = view.id === currentView;

              return (
                <button
                  key={view.id}
                  type="button"
                  className={`pill-button ${
                    active ? 'bg-slate-950 text-white' : 'bg-white text-slate-600'
                  } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                  onClick={() => !disabled && onChangeView(view.id)}
                >
                  {view.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 rounded-full border border-slate-200 bg-white p-2">
              <button
                type="button"
                className={`pill-button ${currentRole === 'cashier' ? 'bg-red-600 text-white' : 'text-slate-600'}`}
                onClick={() => onChangeRole('cashier')}
              >
                Cashier
              </button>
              <button
                type="button"
                className={`pill-button ${currentRole === 'admin' ? 'bg-amber-500 text-slate-950' : 'text-slate-600'}`}
                onClick={() => onChangeRole('admin')}
              >
                Admin
              </button>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                isOffline ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isOffline ? 'Offline-ready simulation mode' : 'Backend connected'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
