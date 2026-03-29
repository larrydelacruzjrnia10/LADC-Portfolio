export const storageKeys = {
  products: 'quickbite-pos-products',
  orders: 'quickbite-pos-orders',
  report: 'quickbite-pos-report',
};

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function buildCartItemKey(productId, addOns = []) {
  const addOnKey = addOns
    .map((addOn) => addOn.name)
    .sort((first, second) => first.localeCompare(second))
    .join('|');

  return `${productId}-${addOnKey || 'base'}`;
}

export function getCartTotals(cart, taxRate = 0.12) {
  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    total,
  };
}

export function getLowStockItemsFromProducts(products) {
  return products
    .filter((product) => product.stock <= product.lowStockThreshold)
    .map((product) => ({
      id: product._id,
      name: product.name,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      status: product.stock === 0 ? 'out' : 'low',
    }));
}

export function buildLocalReceiptNumber() {
  const now = new Date();
  const dateKey = now.toISOString().slice(0, 10).replace(/-/g, '');
  const sequence = String(now.getMilliseconds()).padStart(4, '0');
  return `SIM-${dateKey}-${sequence}`;
}

export function buildDailyReportFromOrders(orders, products) {
  const normalizedOrders = [...orders].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
  const totalRevenue = normalizedOrders.reduce((sum, order) => sum + order.total, 0);
  const totalTax = normalizedOrders.reduce((sum, order) => sum + order.tax, 0);

  const topItemsMap = new Map();
  const paymentMap = new Map();

  normalizedOrders.forEach((order) => {
    paymentMap.set(order.paymentType, {
      paymentType: order.paymentType,
      totalRevenue: Number(((paymentMap.get(order.paymentType)?.totalRevenue || 0) + order.total).toFixed(2)),
      totalOrders: (paymentMap.get(order.paymentType)?.totalOrders || 0) + 1,
    });

    order.items.forEach((item) => {
      const current = topItemsMap.get(item.name) || { name: item.name, quantitySold: 0, revenue: 0 };
      current.quantitySold += item.quantity;
      current.revenue = Number((current.revenue + item.lineTotal).toFixed(2));
      topItemsMap.set(item.name, current);
    });
  });

  return {
    summary: {
      totalOrders: normalizedOrders.length,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalTax: Number(totalTax.toFixed(2)),
      averageTicket: normalizedOrders.length ? Number((totalRevenue / normalizedOrders.length).toFixed(2)) : 0,
    },
    topItems: [...topItemsMap.values()]
      .sort((first, second) => second.quantitySold - first.quantitySold || second.revenue - first.revenue)
      .slice(0, 5),
    salesByPayment: [...paymentMap.values()].sort((first, second) => second.totalRevenue - first.totalRevenue),
    lowStockItems: getLowStockItemsFromProducts(products),
    latestOrders: normalizedOrders.slice(0, 5),
  };
}
