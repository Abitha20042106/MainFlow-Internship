const Train = require('../models/Train');

exports.getTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addTrain = async (req, res) => {
  const { trainName, from, to, departureTime, arrivalTime, seatsAvailable } = req.body;
  try {
    const newTrain = new Train({
      trainName,
      from,
      to,
      departureTime,
      arrivalTime,
      seatsAvailable,
    });
    await newTrain.save();
    res.status(201).json({ msg: 'Train added successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
