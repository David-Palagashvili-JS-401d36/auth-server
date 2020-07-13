// This module sets up a mongoose schema to hold user data.

//bring in mongoose to use with our schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    passWord: {type: String, required: true},
    email: {type: String},
    fullName: {type: String},
    role: {type: String}
});

module.exports = mongoose.model('user', userSchema);