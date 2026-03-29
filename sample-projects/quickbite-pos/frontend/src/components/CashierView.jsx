import ProductCard from './ProductCard';
import { formatCurrency } from '../lib/posUtils';

const paymentOptions = ['Cash', 'Card', 'GCash'];

function CashierView({
  categories,
  products,
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  totals,
  paymentType,
  onPaymentTypeChange,
  cashReceived,
  onCashReceivedChange,
  onSubmitOrder,
  canCheckout,
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="soft-label">Order Management</div>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Touch-friendly menu browser</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Browse fast-food items by category, add combo meals, and customize each order with simple add-ons.
            </p>
          </div>

          <label className="block w-full max-w-md">
            <span className="mb-2 block text-sm font-semibold text-slate-600">Search menu</span>
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search burgers, fries, and drinks"
              className="w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-red-300 focus:bg-white"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`pill-button ${
                selectedCategory === category ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
      </section>

      <aside className="panel p-5 sm:p-6 xl:sticky xl:top-6 xl:h-fit">
        <div className="flex items-center justify-between">
          <div>
            <div className="soft-label">Cart & Checkout</div>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Live order summary</h2>
          </div>
          <div className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Items</p>
            <p className="mt-1 text-xl font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {cart.length ? (
            cart.map((item) => (
              <div key={item.key} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    {item.selectedAddOns.length ? (
                      <p className="mt-1 text-sm text-slate-500">
                        {item.selectedAddOns.map((addOn) => addOn.name).join(', ')}
                      </p>
                    ) : null}
                  </div>
                  <button type="button" className="text-sm font-semibold text-red-600" onClick={() => onRemoveItem(item.key)}>
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2">
                    <button
                      type="button"
                      className="pill-button-secondary !px-3 !py-2"
                      onClick={() => onUpdateQuantity(item.key, -1)}
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      className="pill-button-secondary !px-3 !py-2"
                      onClick={() => onUpdateQuantity(item.key, 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold text-slate-950">{formatCurrency(item.lineTotal)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-lg font-semibold text-slate-700">No items in cart yet</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Add burgers, fries, drinks, or combo meals to start a new order.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-[1.75rem] bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
            <span>Tax</span>
            <span>{formatCurrency(totals.tax)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xl font-bold">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-700">Payment method</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {paymentOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`pill-button ${
                  paymentType === option ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
                onClick={() => onPaymentTypeChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {paymentType === 'Cash' ? (
          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Cash received</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cashReceived}
              onChange={(event) => onCashReceivedChange(event.target.value)}
              placeholder="Enter cash amount"
              className="w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-red-300 focus:bg-white"
            />
          </label>
        ) : null}

        <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
          Receipt generation is simulated after checkout, and cash payments automatically compute the change.
        </div>

        <button
          type="button"
          className="pill-button-primary mt-6 w-full py-4 text-base"
          onClick={onSubmitOrder}
          disabled={!canCheckout}
        >
          Complete Order
        </button>
      </aside>
    </div>
  );
}

export default CashierView;
