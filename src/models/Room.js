import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la sala es obligatorio'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'La capacidad es obligatoria'],
      min: [1, 'La capacidad debe ser al menos 1'],
    },
    type: {
      type: String,
      enum: ['private', 'shared', 'meeting_room'],
      required: [true, 'El tipo de sala es obligatorio'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'El precio por hora es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
