// Import mongoose for defining schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Used for hashing passwords

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Pre-save middleware to hash the password before storing it
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Export the User model to be used in routes
module.exports = mongoose.model('User', UserSchema);
