import mongoose from 'mongoose';

const orderAddOnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    selectedAddOns: {
      type: [orderAddOnSchema],
      default: [],
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cashierName: {
      type: String,
      default: 'Cashier 01',
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(items) => items.length > 0, 'Order must contain at least one item'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ['Cash', 'Card', 'GCash'],
    },
    cashReceived: {
      type: Number,
      default: 0,
      min: 0,
    },
    change: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Preparing', 'Ready'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', orderSchema);
