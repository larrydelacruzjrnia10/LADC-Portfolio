import { useState } from 'react';
import { formatCurrency } from '../lib/posUtils';
import StatusBadge from './StatusBadge';

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const isOutOfStock = product.stock === 0 || !product.isActive;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  function toggleAddOn(addOn) {
    setSelectedAddOns((current) =>
      current.some((item) => item.name === addOn.name)
        ? current.filter((item) => item.name !== addOn.name)
        : [...current, addOn],
    );
  }

  function handleAdd() {
    if (isOutOfStock) {
      return;
    }

    onAdd(product, selectedAddOns, quantity);
    setQuantity(1);
    setSelectedAddOns([]);
  }

  return (
    <article className="panel flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-500">{product.category}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{product.name}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">{product.description}</p>
        </div>
        <div className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-right text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Price</p>
          <p className="mt-1 text-lg font-bold">{formatCurrency(product.price)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.isCombo ? <StatusBadge tone="warning">Combo Meal</StatusBadge> : null}
        {!product.isActive ? <StatusBadge tone="danger">Disabled</StatusBadge> : null}
        {isOutOfStock ? <StatusBadge tone="danger">Out of Stock</StatusBadge> : null}
        {isLowStock ? <StatusBadge tone="warning">Low Stock: {product.stock}</StatusBadge> : null}
        {!isOutOfStock && !isLowStock ? <StatusBadge tone="success">In Stock: {product.stock}</StatusBadge> : null}
      </div>

      {product.addOns?.length ? (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Optional add-ons</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.addOns.map((addOn) => {
              const selected = selectedAddOns.some((item) => item.name === addOn.name);

              return (
                <button
                  key={addOn.name}
                  type="button"
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                    selected
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                  onClick={() => toggleAddOn(addOn)}
                >
                  {addOn.name} (+{formatCurrency(addOn.price)})
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-2">
          <button
            type="button"
            className="pill-button-secondary !px-3 !py-2"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span className="min-w-8 text-center text-lg font-bold">{quantity}</span>
          <button
            type="button"
            className="pill-button-secondary !px-3 !py-2"
            onClick={() => setQuantity((current) => current + 1)}
          >
            +
          </button>
        </div>

        <button type="button" className="pill-button-primary flex-1" onClick={handleAdd} disabled={isOutOfStock}>
          Add to Order
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
