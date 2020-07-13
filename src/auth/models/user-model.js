'use strict'
// require our model, schema, and auth middleware
const schema = require('./user-schema.js');

const Model = require('./mongo.js');

const bCrypt = require('bcrypt');

const jsonWebToken = require('jsonwebtoken');

// Env vars for tokens
let SECRET = process.env.SECRET;
let EXPIRES = process.env.TOKEN_DEATH;

// define user permissions for RBAC. Supported roles include a regular user, a writer, an editor, and an administrator with full permissions.
const userRoles = {
    user: ['read'], // a regular user can only access/view content
    writer: ['read', 'create'], // a writer can add content
    editor: ['read', 'create', 'update'], // an editor can add AND modify content
    admin: ['read', 'create', 'update', 'delete'] // an admin can do it all
};

// "User" class that utilizes the user-schema.
class User extends Model {
    constructor() {
        super(schema);
    };

    static passHash(passWord) { // Before we save a record,
        return bCrypt.hash(passWord, 5); // we hash the plain text password entered,
    };// we get back a promise or rejected with an error.

    static async authenticate(userName, passWord) { // method to authenticate a user using the hashed password
        try {
            let user = await schema.find( {userName} );
            let authorized = await bCrypt.compare(passWord, user[0].passWord);
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
    static generateToken(userName) {
        let token = jsonWebToken.sign(userName, SECRET, {expiresIn: EXPIRES});
        return token;
    };

    static async validateToken(token) { // method that will accept a token, and use the JWT library to validate it with the secret
        try { // If it’s valid look up the user,
            let user = await jsonWebToken.verify(token, SECRET);
            return user; // and return the user
        } catch(error) {
            return false; // Otherwise, its false so return an error.
        }
    };
    // Method that adds information to a user without saving it to the DB
    async createTempUser(data) {
        this.userName = data.userName;
        this.passWord = data.passWord;
        this.role = data.role;
        return this;
    };
    
    async validatePermission (capability) { // will accept a capability
        if (userRoles[this.role].includes(capability)) { // Validate this against the permissions on the user granted by the Role they are assigned to (this.role)
            //console.log('returns true');
            return true;
        }
        //console.log('returns false');
        return false; // Otherwise, return an error
    };
};

// export our user model
module.exports = User;