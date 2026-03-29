import Product from '../models/Product.js';
import { getLowStockItems } from '../utils/getLowStockItems.js';

export async function getProducts(req, res, next) {
  try {
    const { category, search, includeInactive } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (includeInactive !== 'true') {
      filter.isActive = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ category: 1, name: 1 });

    res.json({
      products,
      lowStockItems: getLowStockItems(products),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    const allowedFields = ['price', 'stock', 'isActive', 'lowStockThreshold'];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();
    res.json({ product });
  } catch (error) {
    next(error);
  }
}
