function formatDateKey(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

export async function buildReceiptNumber(OrderModel, date = new Date()) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const sequence = (await OrderModel.countDocuments({ createdAt: { $gte: dayStart, $lt: dayEnd } })) + 1;
  return `QB-${formatDateKey(date)}-${String(sequence).padStart(4, '0')}`;
}
