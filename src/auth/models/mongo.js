'use strict';
// This module acts as an interface for mongo CRUD operations.

class DBinterface {
    constructor(schema) {
        this.schema = schema;
    };
    fetchUserByName(userName) { // method that gets by username, a record stored in the db.
        let parameter = userName ? {userName} : {};
        return this.schema.find(parameter)
        .then(result => {
            let requestFormatted = result[0]; // index zero should be the username according to our schema
            return requestFormatted;
        }).catch(error => console.log(error));
    };
    // performs a find() query in our schema
    read(_id) {
        let parameter = _id ? {_id} : {};
        return this.schema.find(parameter)
        .then(result => {
            let requestFormatted = {
                results: result,
                count: result.length
            }
            return requestFormatted;
        }).catch(error => console.log(error));
    };
    // performs a save() query in our schema for a new record
    create(data) {
        let newRecord = new this.schema(data);
        return newRecord.save();
    };
    // performs a findOneByIdAndUpdate() operation in your schema for an existing record
    update(_id, data) {
        return this.schema.findByIdAndUpdate(_id, data);
    };
    // performs a findOneByIdAndDelete() in your schema for a new record
    delete(_id) {
        return this.schema.findByIdAndDelete(_id);
    };
    // performs an operation to check if a record exists.
    exists(data) {
        return this.schema.exists(data);
    };
};

// export our mongo interface module
module.exports = DBinterface;