const Booking = require('../models/Booking');
const Train = require('../models/Train');

exports.bookTicket = async (req, res) => {
  const { userId, trainId, seatsBooked } = req.body;
  try {
    const train = await Train.findById(trainId);
    if (!train || train.seatsAvailable < seatsBooked) {
      return res.status(400).json({ msg: 'Not enough seats available' });
    }
    const booking = new Booking({
      user: userId,
      train: trainId,
      seatsBooked,
    });
    train.seatsAvailable -= seatsBooked;
    await train.save();
    await booking.save();
    res.status(201).json({ msg: 'Ticket booked successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
