import { Router } from 'express';
import { getBookings, getBookingById, createBooking, updateBookingStatus } from '../controllers/bookingController.js';

const router = Router();

router.route('/').get(getBookings).post(createBooking);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);

export default router;
