export function calculateOrderTotals(items, taxRate = 0.12) {
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    total,
  };
}
