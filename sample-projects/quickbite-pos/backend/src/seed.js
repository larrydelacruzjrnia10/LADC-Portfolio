import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import User from './models/User.js';
import seedProducts from './data/seedProducts.js';
import seedUsers from './data/seedUsers.js';
import { calculateOrderTotals } from './utils/calculateOrderTotals.js';

dotenv.config();

async function seedDatabase() {
  await connectDatabase(process.env.MONGODB_URI);

  await Promise.all([Product.deleteMany({}), Order.deleteMany({}), User.deleteMany({})]);

  const productDocs = await Product.insertMany(seedProducts);
  const productMap = new Map(productDocs.map((product) => [product.name, product]));

  const userDocs = await Promise.all(
    seedUsers.map(async (user) => ({
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
      role: user.role,
    })),
  );

  await User.insertMany(userDocs);

  const sampleOrders = [
    {
      receiptNumber: 'QB-DEMO-0001',
      cashierName: 'Cashier 01',
      paymentType: 'Cash',
      cashReceived: 500,
      status: 'Ready',
      createdAt: new Date(new Date().setHours(9, 15, 0, 0)),
      items: [
        { productName: 'Classic Burger', quantity: 2, selectedAddOns: ['Extra Cheese'] },
        { productName: 'Iced Tea', quantity: 2, selectedAddOns: [] },
      ],
    },
    {
      receiptNumber: 'QB-DEMO-0002',
      cashierName: 'Cashier 01',
      paymentType: 'Card',
      cashReceived: 0,
      status: 'Ready',
      createdAt: new Date(new Date().setHours(11, 5, 0, 0)),
      items: [
        { productName: 'Burger Combo Meal', quantity: 1, selectedAddOns: ['Upsize Drink'] },
        { productName: 'Loaded Fries', quantity: 1, selectedAddOns: [] },
      ],
    },
    {
      receiptNumber: 'QB-DEMO-0003',
      cashierName: 'Cashier 02',
      paymentType: 'GCash',
      cashReceived: 0,
      status: 'Preparing',
      createdAt: new Date(new Date().setHours(12, 40, 0, 0)),
      items: [
        { productName: 'Chicken Combo Meal', quantity: 2, selectedAddOns: ['Extra Gravy'] },
      ],
    },
    {
      receiptNumber: 'QB-DEMO-0004',
      cashierName: 'Cashier 02',
      paymentType: 'Cash',
      cashReceived: 600,
      status: 'Pending',
      createdAt: new Date(new Date().setHours(13, 10, 0, 0)),
      items: [
        { productName: 'Family Snack Combo', quantity: 1, selectedAddOns: ['Extra Fries'] },
        { productName: 'Cola Float', quantity: 2, selectedAddOns: [] },
      ],
    },
  ];

  for (const sampleOrder of sampleOrders) {
    const normalizedItems = sampleOrder.items.map((item) => {
      const product = productMap.get(item.productName);
      const addOns = item.selectedAddOns.map((addOnName) => {
        const addOn = product.addOns.find((option) => option.name === addOnName);
        return { name: addOn.name, price: addOn.price };
      });

      product.stock -= item.quantity;

      const lineTotal = (product.price + addOns.reduce((sum, addOn) => sum + addOn.price, 0)) * item.quantity;

      return {
        product: product._id,
        name: product.name,
        category: product.category,
        basePrice: product.price,
        quantity: item.quantity,
        selectedAddOns: addOns,
        lineTotal,
      };
    });

    const { subtotal, tax, total } = calculateOrderTotals(normalizedItems);

    await Order.create({
      receiptNumber: sampleOrder.receiptNumber,
      cashierName: sampleOrder.cashierName,
      items: normalizedItems,
      subtotal,
      tax,
      total,
      paymentType: sampleOrder.paymentType,
      cashReceived: sampleOrder.paymentType === 'Cash' ? sampleOrder.cashReceived : total,
      change:
        sampleOrder.paymentType === 'Cash'
          ? Number((sampleOrder.cashReceived - total).toFixed(2))
          : 0,
      status: sampleOrder.status,
      createdAt: sampleOrder.createdAt,
      updatedAt: sampleOrder.createdAt,
    });
  }

  for (const product of productDocs) {
    await product.save();
  }

  console.log('QuickBite POS demo data seeded successfully');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Failed to seed QuickBite POS demo data:', error);
  process.exit(1);
});
