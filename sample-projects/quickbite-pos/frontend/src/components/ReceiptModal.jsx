import { formatCurrency } from '../lib/posUtils';

function ReceiptModal({ order, onClose }) {
  if (!order) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-order sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="soft-label">Receipt Preview</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950">{order.receiptNumber}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {order.cashierName} - {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button type="button" className="pill-button-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={`${item.name}-${item.lineTotal}`} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {item.quantity}x {item.name}
                  </p>
                  {item.selectedAddOns?.length ? (
                    <p className="mt-1 text-sm text-slate-500">
                      Add-ons: {item.selectedAddOns.map((addOn) => addOn.name).join(', ')}
                    </p>
                  ) : null}
                </div>
                <p className="font-semibold text-slate-900">{formatCurrency(item.lineTotal)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-dashed border-slate-300 pt-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-bold text-slate-950">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span>Payment</span>
              <span>{order.paymentType}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>Cash received</span>
              <span>{formatCurrency(order.cashReceived)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>Change</span>
              <span>{formatCurrency(order.change)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
