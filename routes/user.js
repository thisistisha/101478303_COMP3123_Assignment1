// Import required modules
const express = require('express');
const router = express.Router(); // Router to handle requests
const User = require('../models/user'); // User model
const bcrypt = require('bcryptjs'); // Used for password comparison

// POST /api/v1/user/signup - Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save(); // Save the new user to the database
        res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/v1/user/login - Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Find the user by email

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // You can also generate a JWT token here if needed
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router to be used in app.js
module.exports = router;
