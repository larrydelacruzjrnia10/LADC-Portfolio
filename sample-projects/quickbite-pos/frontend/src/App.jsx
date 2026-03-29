import { useEffect, useMemo, useState } from 'react';
import AdminView from './components/AdminView';
import CashierView from './components/CashierView';
import KitchenView from './components/KitchenView';
import ReceiptModal from './components/ReceiptModal';
import TopBar from './components/TopBar';
import { demoOrders, demoProducts } from './data/demoData';
import {
  createOrder,
  fetchDailyReport,
  fetchOrders,
  fetchProducts,
  updateOrderStatus,
  updateProduct,
} from './lib/api';
import {
  buildCartItemKey,
  buildDailyReportFromOrders,
  buildLocalReceiptNumber,
  getCartTotals,
  storageKeys,
} from './lib/posUtils';

function readLocalStorage(key, fallbackValue) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

const initialProducts = readLocalStorage(storageKeys.products, demoProducts);
const initialOrders = readLocalStorage(storageKeys.orders, demoOrders);
const initialReport = readLocalStorage(
  storageKeys.report,
  buildDailyReportFromOrders(initialOrders, initialProducts),
);

function App() {
  const [currentView, setCurrentView] = useState('cashier');
  const [currentRole, setCurrentRole] = useState('cashier');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [report, setReport] = useState(initialReport);
  const [cart, setCart] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [paymentType, setPaymentType] = useState('Cash');
  const [cashReceived, setCashReceived] = useState('');
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totals = useMemo(() => getCartTotals(cart), [cart]);

  const cashierProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!product.isActive) {
          return false;
        }

        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const query = searchValue.trim().toLowerCase();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      }),
    [products, searchValue, selectedCategory],
  );

  const categoryOptions = useMemo(
    () => ['All', ...new Set(products.filter((product) => product.isActive).map((product) => product.category))],
    [products],
  );

  const kitchenOrders = useMemo(
    () =>
      [...orders].sort(
        (first, second) => new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime(),
      ),
    [orders],
  );

  const canCheckout =
    cart.length > 0 && (paymentType !== 'Cash' || Number(cashReceived || 0) >= Number(totals.total || 0));

  useEffect(() => {
    if (currentRole === 'cashier' && currentView === 'admin') {
      setCurrentView('cashier');
    }
  }, [currentRole, currentView]);

  useEffect(() => {
    localStorage.setItem(storageKeys.products, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(storageKeys.orders, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(storageKeys.report, JSON.stringify(report));
  }, [report]);

  useEffect(() => {
    loadDashboardData();

    const intervalId = window.setInterval(() => {
      loadDashboardData({ quiet: true });
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  async function loadDashboardData({ quiet = false } = {}) {
    if (!quiet) {
      setIsLoading(true);
    }

    try {
      const [productResponse, orderResponse, reportResponse] = await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchDailyReport(),
      ]);

      setProducts(productResponse.products);
      setOrders(orderResponse.orders);
      setReport(reportResponse);
      setIsOffline(false);
    } catch (error) {
      setProducts(readLocalStorage(storageKeys.products, demoProducts));
      setOrders(readLocalStorage(storageKeys.orders, demoOrders));
      setReport(readLocalStorage(storageKeys.report, buildDailyReportFromOrders(demoOrders, demoProducts)));
      setIsOffline(true);
    } finally {
      if (!quiet) {
        setIsLoading(false);
      }
    }
  }

  function addToCart(product, selectedAddOns, quantity) {
    const addOns = selectedAddOns.map((addOn) => ({ name: addOn.name, price: addOn.price }));
    const key = buildCartItemKey(product._id, addOns);
    const unitPrice = product.price + addOns.reduce((sum, addOn) => sum + addOn.price, 0);

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.key === key);

      if (existingItem) {
        return currentCart.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + quantity,
                lineTotal: Number((unitPrice * (item.quantity + quantity)).toFixed(2)),
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          key,
          productId: product._id,
          name: product.name,
          category: product.category,
          basePrice: product.price,
          quantity,
          selectedAddOns: addOns,
          lineTotal: Number((unitPrice * quantity).toFixed(2)),
        },
      ];
    });
  }

  function updateCartQuantity(key, delta) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.key !== key) {
            return item;
          }

          const nextQuantity = item.quantity + delta;
          const unitPrice = item.basePrice + item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);

          return {
            ...item,
            quantity: nextQuantity,
            lineTotal: Number((unitPrice * nextQuantity).toFixed(2)),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  }

  function removeCartItem(key) {
    setCart((currentCart) => currentCart.filter((item) => item.key !== key));
  }

  async function submitOrder() {
    const payload = {
      cashierName: currentRole === 'admin' ? 'Admin Desk' : 'Cashier 01',
      paymentType,
      cashReceived: paymentType === 'Cash' ? Number(cashReceived || 0) : totals.total,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        selectedAddOns: item.selectedAddOns,
      })),
    };

    try {
      const response = await createOrder(payload);
      setReceiptOrder(response.order);
      setCart([]);
      setCashReceived('');
      setPaymentType('Cash');
      await loadDashboardData({ quiet: true });
    } catch (error) {
      const simulatedOrder = {
        _id: `local-${Date.now()}`,
        receiptNumber: buildLocalReceiptNumber(),
        cashierName: payload.cashierName,
        items: cart.map((item) => ({
          product: item.productId,
          name: item.name,
          category: item.category,
          basePrice: item.basePrice,
          quantity: item.quantity,
          selectedAddOns: item.selectedAddOns,
          lineTotal: item.lineTotal,
        })),
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        paymentType,
        cashReceived: payload.cashReceived,
        change: paymentType === 'Cash' ? Number((payload.cashReceived - totals.total).toFixed(2)) : 0,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      const nextProducts = products.map((product) => {
        const matchedItem = cart.find((item) => item.productId === product._id);
        return matchedItem
          ? {
              ...product,
              stock: Math.max(0, product.stock - matchedItem.quantity),
            }
          : product;
      });

      const nextOrders = [simulatedOrder, ...orders];
      const nextReport = buildDailyReportFromOrders(nextOrders, nextProducts);

      setProducts(nextProducts);
      setOrders(nextOrders);
      setReport(nextReport);
      setReceiptOrder(simulatedOrder);
      setCart([]);
      setCashReceived('');
      setPaymentType('Cash');
      setIsOffline(true);
    }
  }

  async function advanceOrderStatus(orderId, nextStatus) {
    try {
      await updateOrderStatus(orderId, nextStatus);
      await loadDashboardData({ quiet: true });
    } catch (error) {
      const nextOrders = orders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              status: nextStatus,
            }
          : order,
      );

      setOrders(nextOrders);
      setReport(buildDailyReportFromOrders(nextOrders, products));
      setIsOffline(true);
    }
  }

  async function restockProduct(productId, quantity) {
    const targetProduct = products.find((product) => product._id === productId);

    if (!targetProduct) {
      return;
    }

    const nextStock = targetProduct.stock + quantity;

    try {
      await updateProduct(productId, { stock: nextStock });
      await loadDashboardData({ quiet: true });
    } catch (error) {
      const nextProducts = products.map((product) =>
        product._id === productId
          ? {
              ...product,
              stock: nextStock,
            }
          : product,
      );

      setProducts(nextProducts);
      setReport(buildDailyReportFromOrders(orders, nextProducts));
      setIsOffline(true);
    }
  }

  async function toggleAvailability(productId, isActive) {
    try {
      await updateProduct(productId, { isActive });
      await loadDashboardData({ quiet: true });
    } catch (error) {
      const nextProducts = products.map((product) =>
        product._id === productId
          ? {
              ...product,
              isActive,
            }
          : product,
      );

      setProducts(nextProducts);
      setReport(buildDailyReportFromOrders(orders, nextProducts));
      setIsOffline(true);
    }
  }

  return (
    <div className="shell">
      <TopBar
        currentView={currentView}
        onChangeView={setCurrentView}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        isOffline={isOffline}
      />

      {isLoading ? (
        <div className="panel p-8 text-center text-slate-500">Loading QuickBite POS workspace...</div>
      ) : null}

      {!isLoading && currentView === 'cashier' ? (
        <CashierView
          categories={categoryOptions}
          products={cashierProducts}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          cart={cart}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeCartItem}
          totals={totals}
          paymentType={paymentType}
          onPaymentTypeChange={setPaymentType}
          cashReceived={cashReceived}
          onCashReceivedChange={setCashReceived}
          onSubmitOrder={submitOrder}
          canCheckout={canCheckout}
        />
      ) : null}

      {!isLoading && currentView === 'kitchen' ? (
        <KitchenView orders={kitchenOrders} onAdvanceStatus={advanceOrderStatus} />
      ) : null}

      {!isLoading && currentView === 'admin' ? (
        <AdminView
          report={report}
          products={products}
          onRestock={restockProduct}
          onToggleAvailability={toggleAvailability}
        />
      ) : null}

      <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />
    </div>
  );
}

export default App;
