const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb://localhost:27017/Data')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in Connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


// Train Schema and Model
const trainSchema = new mongoose.Schema({
  trainName: String,
  source: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
  seatsAvailable: Number,
})

const Train = mongoose.model('Train', trainSchema);

// Routes
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  newUser.save((err) => {
    if (err) {
      return res.status(500).send("Error registering user");
    }
    return res.status(200).send("User registered successfully");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password }, (err, user) => {
    if (err) {
      return res.status(500).send("Error logging in");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User logged in successfully");
  });
});

app.post("/book-train", (req, res) => {
  const { trainName, source, destination, departureTime, arrivalTime, seatsAvailable } = req.body;

  const newTrain = new Train({ trainName, source, destination, departureTime, arrivalTime, seatsAvailable });

  newTrain.save((err) => {
    if (err) {
      return res.status(500).send("Error booking train");
    }
    return res.status(200).send("Train booked successfully");
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
