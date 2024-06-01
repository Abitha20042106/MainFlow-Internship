const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Train', TrainSchema);
