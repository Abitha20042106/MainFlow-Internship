const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  seatsBooked: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
