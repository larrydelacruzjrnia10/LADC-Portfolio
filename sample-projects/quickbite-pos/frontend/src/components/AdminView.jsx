import MetricCard from './MetricCard';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../lib/posUtils';

function AdminView({ report, products, onRestock, onToggleAvailability }) {
  const lowStockItems = report.lowStockItems || [];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Orders Today" value={report.summary.totalOrders} accent="red" />
        <MetricCard label="Revenue" value={report.summary.totalRevenue} currency accent="amber" />
        <MetricCard label="Tax Collected" value={report.summary.totalTax} currency accent="slate" />
        <MetricCard label="Average Ticket" value={report.summary.averageTicket} currency accent="red" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="panel p-5 sm:p-6">
          <div className="soft-label">Sales Dashboard</div>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Daily sales snapshot</h2>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Top-selling items</p>
              <div className="mt-3 space-y-3">
                {report.topItems.length ? (
                  report.topItems.map((item) => (
                    <div key={item.name} className="rounded-[1.4rem] bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <StatusBadge tone="info">{item.quantitySold} sold</StatusBadge>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{formatCurrency(item.revenue)} revenue</p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[1.4rem] bg-slate-50 p-4 text-sm text-slate-500">No sales data yet.</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Sales by payment type</p>
              <div className="mt-3 space-y-3">
                {report.salesByPayment.length ? (
                  report.salesByPayment.map((entry) => (
                    <div
                      key={entry.paymentType}
                      className="flex items-center justify-between rounded-[1.4rem] bg-slate-50 p-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{entry.paymentType}</p>
                        <p className="text-sm text-slate-500">{entry.totalOrders} orders</p>
                      </div>
                      <p className="font-semibold text-slate-900">{formatCurrency(entry.totalRevenue)}</p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[1.4rem] bg-slate-50 p-4 text-sm text-slate-500">No payment summary yet.</p>
                )}
              </div>
            </div>
          </div>
        </article>

        <article className="panel p-5 sm:p-6">
          <div className="soft-label">Inventory Tracking</div>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Menu stock and availability</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Admin can restock items quickly and toggle whether a product is available at the cashier terminal.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <StatusBadge tone="warning">{lowStockItems.length} low-stock alerts</StatusBadge>
            <StatusBadge tone="danger">
              {lowStockItems.filter((item) => item.status === 'out').length} out of stock
            </StatusBadge>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {products.map((product) => {
              const stockTone =
                product.stock === 0 ? 'danger' : product.stock <= product.lowStockThreshold ? 'warning' : 'success';

              return (
                <div key={product._id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {product.category} - {formatCurrency(product.price)}
                      </p>
                    </div>
                    <StatusBadge tone={stockTone}>Stock: {product.stock}</StatusBadge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="pill-button-primary" onClick={() => onRestock(product._id, 5)}>
                      +5 Restock
                    </button>
                    <button
                      type="button"
                      className="pill-button-secondary"
                      onClick={() => onToggleAvailability(product._id, !product.isActive)}
                    >
                      {product.isActive ? 'Disable Item' : 'Enable Item'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminView;
