const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send('Item added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send('Item deleted successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send('Item updated successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
