const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username is required'], index: true, unique: true  },
    password: { type: String, required: [true, 'Password required'] },
    authorization: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
