'use strict';
// Bring in the middleware to be used by the server
const express = require('express');

//require router module just like in our last lab, except is lives in a different folder.
const authenticationRouter = require('./auth/router.js');

//TODO: set up router to test auth routes.
const testRouter = require('./auth/router.js');

const app = express();
// app.use() each them in our app so that our routes will respond.
app.use(express.json());

app.get('/', authenticationRouter);

// exports as object to be triggered instead of starting on its own.
module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => {
            console.log('Our server is running on port: ' + port);
        });
    }
};