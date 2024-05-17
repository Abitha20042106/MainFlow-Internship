// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URL and options
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Database';

// Function to retrieve the name from the database
async function getName() {
  let result;
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Connect to the database
    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection('users');

    // Find the first document in the collection
    result = await collection.findOne({});

    // Close the connection
    await client.close();
  } catch (err) {
    console.error(err);
  }

  // Return the name field from the document
  return result.name;
}

// Function to pass the name to the HTML document
function setName(name) {
  // Get the HTML element with the id 'name'
  const nameElement = document.getElementById('name');

  // Set the innerHTML of the element to the name
  nameElement.innerHTML = name;
}

// Call the getName function and pass the result to the setName function
getName().then(name => setName(name));