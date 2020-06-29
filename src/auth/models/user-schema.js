// TODO: set up a mongo schema to hold user data.

//bring in mongoose to use with our schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String},
    fullname: {type: String},
    role: {type: String}
});

module.exports = mongoose.model('user', userSchema);