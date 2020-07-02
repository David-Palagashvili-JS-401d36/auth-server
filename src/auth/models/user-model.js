'use strict'
// TODO: set up class called user that utilizes the user-schema.

// require our model, schema, and auth middleware
const schema = require('./users-schema.js');

const Model = require('./mongo.js');

const bCrypt = require('bcrypt');

const jsonWebToken = require('jsonwebtoken');

// just like oauth, we have set a secret set of characters.
let SECRET = process.env.SECRET;

// "User" class that utilizes the user-schema.
class User extends Model {
    constructor() {
        super(schema);
    }; 
    static passHash(password) { // Before we save a record,
        return bCrypt.hash(password, 5); // we hash the plain text password entered,
    }; // we get back a promise or rejected with an error.
    static async authenticate(username, password) { // method to authenticate a user using the hashed password
        try {
            let user = await schema.find({username});
            let authorized = await bCrypt.compare(password, user[0].password);
            if (authorized) {
                return user[0];
            } else {
                return false;
            };
        } catch(error) {
            console.error('it didn\'t like that: ', error)
            return false;
        };
    }; // generate a Token following a valid login
    static generateToken(username) {
        let token = jsonWebToken.sign(username, SECRET);
        return token;
    };
};
// export our user model
module.exports = User;