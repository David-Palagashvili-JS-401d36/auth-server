// TODO: set up class called user that utilizes the user-schema.

// require our model, schema, and auth middleware
const schema = require('./users-schema.js');

const Model = require('./mongo.js');

const bCrypt = require('bcrypt');

const jsonWebToken = require('jsonwebtoken');

// just like oauth, we have set a secret set of characters.
let SECRET = process.env.SECRET;

// a "user" class that utilizes the user-schema.
class User extends Model {
    constructor() {
        super(schema);
    };
    static passHash(password) {
        return bCrypt.hash(password, 5);
    };
    static async authenticate (username, password) {
        try {
            let user = await schema.find({username});
            let authorized = await bCrypt.compare(password, user[0].password);
            if (authorized) {
                return user[0];
            } else {
                return false;
            };
        } catch (error) {
            console.error('it didn\'t like that: ', error)
            return false;
        };
    
    };
};

