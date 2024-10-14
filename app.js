// Importing the necessary packages
const express = require('express');  // Express for creating the server and handling routes
const mongoose = require('mongoose'); // Mongoose for MongoDB connection and schema management
const cors = require('cors'); // Allowing cross-origin requests (useful for API)
const bodyParser = require('body-parser'); // Parse incoming request bodies

// Create an Express application
const app = express();

// Middleware: Enable CORS and parse JSON requests
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes: Define where user and employee APIs will be imported
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

// Use the routes defined in user.js and employee.js
app.use('/api/v1/user', userRoutes); // API route for user signup and login
app.use('/api/v1/emp', employeeRoutes); // API route for employee management

// Start the server on port 3000
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
