import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { getLowStockItems } from '../utils/getLowStockItems.js';

export async function getDailyReport(_req, res, next) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const dailyOrders = await Order.find({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ createdAt: -1 });

    const topItems = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay } } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          quantitySold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.lineTotal' },
        },
      },
      { $sort: { quantitySold: -1, revenue: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          name: '$_id',
          quantitySold: 1,
          revenue: 1,
        },
      },
    ]);

    const salesByPayment = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay } } },
      {
        $group: {
          _id: '$paymentType',
          totalRevenue: { $sum: '$total' },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          paymentType: '$_id',
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    const totalRevenue = dailyOrders.reduce((sum, order) => sum + order.total, 0);
    const totalTax = dailyOrders.reduce((sum, order) => sum + order.tax, 0);
    const products = await Product.find({}).sort({ name: 1 });

    res.json({
      summary: {
        totalOrders: dailyOrders.length,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalTax: Number(totalTax.toFixed(2)),
        averageTicket: dailyOrders.length ? Number((totalRevenue / dailyOrders.length).toFixed(2)) : 0,
      },
      topItems,
      salesByPayment,
      lowStockItems: getLowStockItems(products),
      latestOrders: dailyOrders.slice(0, 5),
    });
  } catch (error) {
    next(error);
  }
}
