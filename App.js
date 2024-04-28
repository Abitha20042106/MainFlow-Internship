import React, { useState } from 'react';
import './App.css';

const App = () => {
  // State to keep track of user interactions
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    // Update the click count
    setClickCount(prevCount => prevCount + 1);
  };

  const handleInputChange = (event) => {
    // Update the input value
    setInputValue(event.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Our Website</h1>
      </header>
      <main className="main">
        <section className="section">
          <h2>User Interaction Section</h2>
          <p>Click the button to interact:</p>
          <button onClick={handleButtonClick}>Click Me</button>
          <p>You have clicked the button <strong>{clickCount}</strong> times.</p>
          <p>Enter something:</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here..."
          />
          <p>You typed: <strong>{inputValue}</strong></p>
        </section>
      </main>
    </div>
  );
};

export default App;
