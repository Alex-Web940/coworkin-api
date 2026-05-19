import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'La fecha de inicio es obligatoria'],
    },
    endDate: {
      type: Date,
      required: [true, 'La fecha de fin es obligatoria'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'La reserva debe estar asociada a un miembro'],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'La reserva debe estar asociada a una sala'],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Validación de negocio: endDate debe ser mayor a startDate
bookingSchema.pre('validate', function (next) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate('endDate', 'La fecha de fin debe ser mayor a la fecha de inicio');
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);
