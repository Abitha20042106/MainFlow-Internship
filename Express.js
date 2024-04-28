const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/myformdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Retrieve and display form data from MongoDB
  FormData.find()
    .then((formDataList) => {
      console.log('Retrieved Form Data:');
      formDataList.forEach((formData) => {
        console.log(formData); // Log each form data document to the console
      });
    })
    .catch((error) => {
      console.error('Error retrieving form data:', error);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const formDataSchema = new mongoose.Schema({
    Firstame: String,
    Lastname:String,
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
      },
    Password: { type: String,
    required: true,
    minlength: 8
    }
});


const FormData = mongoose.model('FormData', formDataSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Registration.html');
});

app.post('/submit', (req, res) => {
    const formData = new FormData({
        Firstname: req.body.Firstname,
        Lastname:req.body.Lastname,
        Email: req.body.Email,
       Password:req.body.Password
    });

    formData.save()
        .then(() => {
            res.send('Form submitted successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error submitting form');
        });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});