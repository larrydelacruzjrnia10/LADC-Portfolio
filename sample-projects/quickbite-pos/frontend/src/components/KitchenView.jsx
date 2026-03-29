import { formatCurrency } from '../lib/posUtils';
import StatusBadge from './StatusBadge';

const statusColumns = [
  { title: 'Pending', tone: 'warning', nextStatus: 'Preparing' },
  { title: 'Preparing', tone: 'info', nextStatus: 'Ready' },
  { title: 'Ready', tone: 'success', nextStatus: null },
];

function KitchenView({ orders, onAdvanceStatus }) {
  return (
    <section className="panel p-5 sm:p-6">
      <div className="soft-label">Kitchen Display System</div>
      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">Real-time preparation queue</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Orders move through the kitchen from pending to preparing to ready, helping staff keep service flowing.
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Open Tickets</p>
          <p className="mt-2 text-2xl font-bold">{orders.filter((order) => order.status !== 'Ready').length}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        {statusColumns.map((column) => {
          const columnOrders = orders.filter((order) => order.status === column.title);

          return (
            <div key={column.title} className="rounded-[1.75rem] bg-slate-100 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">{column.title}</h3>
                <StatusBadge tone={column.tone}>{columnOrders.length} orders</StatusBadge>
              </div>

              <div className="mt-4 space-y-4">
                {columnOrders.length ? (
                  columnOrders.map((order) => (
                    <article key={order._id} className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{order.receiptNumber}</p>
                          <p className="mt-1 text-sm text-slate-500">{order.cashierName}</p>
                        </div>
                        <StatusBadge tone={column.tone}>{order.paymentType}</StatusBadge>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        {order.items.map((item) => (
                          <div key={`${item.name}-${item.lineTotal}`} className="flex items-start justify-between gap-3">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>{formatCurrency(item.lineTotal)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {column.nextStatus ? (
                          <button
                            type="button"
                            className="pill-button-primary"
                            onClick={() => onAdvanceStatus(order._id, column.nextStatus)}
                          >
                            Mark {column.nextStatus}
                          </button>
                        ) : (
                          <StatusBadge tone="success">Completed</StatusBadge>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm leading-7 text-slate-500">
                    No {column.title.toLowerCase()} orders at the moment.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default KitchenView;
