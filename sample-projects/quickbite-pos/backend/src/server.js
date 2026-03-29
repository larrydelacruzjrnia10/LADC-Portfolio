import dotenv from 'dotenv';
import app from './app.js';
import connectDatabase from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI);

  app.listen(port, () => {
    console.log(`QuickBite POS backend listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
