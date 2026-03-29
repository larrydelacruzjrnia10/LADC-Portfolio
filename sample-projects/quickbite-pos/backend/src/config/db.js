import mongoose from 'mongoose';

async function connectDatabase(connectionString) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is required');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(connectionString);
}

export default connectDatabase;
