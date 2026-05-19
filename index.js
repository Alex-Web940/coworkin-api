import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import memberRoutes from './src/routes/memberRoutes.js';
import roomRoutes from './src/routes/roomRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
