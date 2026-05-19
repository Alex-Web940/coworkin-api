import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getBookings = async (req, res) => {
  try {
    const { status, roomId } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (roomId) filter.room = roomId;

    const bookings = await Booking.find(filter)
      .populate('member')
      .populate('room')
      .sort({ startDate: 1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const booking = await Booking.findById(id)
      .populate('member')
      .populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `El estado debe ser uno de: ${validStatuses.join(', ')}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('member').populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
