import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { buildReceiptNumber } from '../utils/buildReceiptNumber.js';
import { calculateOrderTotals } from '../utils/calculateOrderTotals.js';
import { getLowStockItems } from '../utils/getLowStockItems.js';

function normalizeAddOns(product, selectedAddOns = []) {
  return selectedAddOns.map((selectedAddOn) => {
    const addOnName = typeof selectedAddOn === 'string' ? selectedAddOn : selectedAddOn?.name;
    const matchedAddOn = product.addOns.find((addOn) => addOn.name === addOnName);

    if (!matchedAddOn) {
      const error = new Error(`Invalid add-on selected for ${product.name}`);
      error.statusCode = 400;
      throw error;
    }

    return {
      name: matchedAddOn.name,
      price: matchedAddOn.price,
    };
  });
}

export async function getOrders(req, res, next) {
  try {
    const { scope, status } = req.query;
    const filter = {};

    if (scope === 'active') {
      filter.status = { $in: ['Pending', 'Preparing'] };
    }

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter).sort({ createdAt: 1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req, res, next) {
  try {
    const { items = [], paymentType = 'Cash', cashReceived = 0, cashierName = 'Cashier 01' } = req.body;

    if (!Array.isArray(items) || !items.length) {
      const error = new Error('Order must include at least one item');
      error.statusCode = 400;
      throw error;
    }

    const normalizedItems = [];
    const productsToUpdate = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        const error = new Error('One or more ordered products are unavailable');
        error.statusCode = 400;
        throw error;
      }

      const quantity = Number(item.quantity) || 1;

      if (product.stock < quantity) {
        const error = new Error(`${product.name} is out of stock for the requested quantity`);
        error.statusCode = 400;
        throw error;
      }

      const selectedAddOns = normalizeAddOns(product, item.selectedAddOns);
      const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
      const lineTotal = Number(((product.price + addOnTotal) * quantity).toFixed(2));

      normalizedItems.push({
        product: product._id,
        name: product.name,
        category: product.category,
        basePrice: product.price,
        quantity,
        selectedAddOns,
        lineTotal,
      });

      product.stock -= quantity;
      productsToUpdate.push(product);
    }

    const { subtotal, tax, total } = calculateOrderTotals(normalizedItems);
    const normalizedCashReceived = Number(cashReceived) || 0;

    if (paymentType === 'Cash' && normalizedCashReceived < total) {
      const error = new Error('Cash received is less than the total amount due');
      error.statusCode = 400;
      throw error;
    }

    for (const product of productsToUpdate) {
      await product.save();
    }

    const receiptNumber = await buildReceiptNumber(Order);
    const order = await Order.create({
      receiptNumber,
      cashierName,
      items: normalizedItems,
      subtotal,
      tax,
      total,
      paymentType,
      cashReceived: paymentType === 'Cash' ? normalizedCashReceived : total,
      change: paymentType === 'Cash' ? Number((normalizedCashReceived - total).toFixed(2)) : 0,
      status: 'Pending',
    });

    const products = await Product.find({}).sort({ name: 1 });

    res.status(201).json({
      order,
      lowStockItems: getLowStockItems(products),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Preparing', 'Ready'];

    if (!allowedStatuses.includes(status)) {
      const error = new Error('Invalid order status');
      error.statusCode = 400;
      throw error;
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    order.status = status;
    await order.save();

    res.json({ order });
  } catch (error) {
    next(error);
  }
}
