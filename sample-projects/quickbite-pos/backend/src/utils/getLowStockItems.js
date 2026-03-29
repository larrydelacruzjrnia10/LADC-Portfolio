export function getLowStockItems(products) {
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
