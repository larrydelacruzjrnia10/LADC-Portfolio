const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'Request failed');
  }

  return response.json();
}

export function fetchProducts() {
  return request('/products?includeInactive=true');
}

export function updateProduct(productId, updates) {
  return request(`/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export function fetchOrders(scope = 'all') {
  const suffix = scope === 'active' ? '?scope=active' : '';
  return request(`/orders${suffix}`);
}

export function createOrder(payload) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateOrderStatus(orderId, status) {
  return request(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export function fetchDailyReport() {
  return request('/reports/daily');
}
