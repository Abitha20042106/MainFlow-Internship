import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post('/api/items', { name, description });
      fetchItems();
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await axios.put(`/api/items/${id}`, updatedItem);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Wish List</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}{' '}
            <button onClick={() => deleteItem(item._id)}>Delete</button>{' '}
            <button
              onClick={() =>
                updateItem(item._id, {
                  name: 'Updated Name',
                  description: 'Updated Description',
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
