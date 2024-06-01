import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookTrain = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState('');
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    const fetchTrains = async () => {
      const response = await axios.get('http://localhost:5000/api/trains');
      setTrains(response.data);
    };
    fetchTrains();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,
        trainId: selectedTrain,
        seatsBooked: seats,
      }, {
        headers: {
          'x-auth-token': user.token,
        },
      });
      alert('Booking successful!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Book Train</h2>
      <form onSubmit={handleBooking}>
        <select value={selectedTrain} onChange={(e) => setSelectedTrain(e.target.value)} required>
          <option value="">Select Train</option>
          {trains.map(train => (
            <option key={train._id} value={train._id}>{train.trainName}</option>
          ))}
        </select>
        <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} min="1" required />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookTrain;
