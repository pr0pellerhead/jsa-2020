const express = require('express');
const bodyParser = require('body-parser');
const db = require('./pkg/db');
const conf = require('./pkg/config');
const auth = require('./handlers/auth');

db.init();

const api = express();

api.use(bodyParser.json());

api.post('/api/v1/auth/register', auth.register);
api.post('/api/v1/auth/login', auth.login);
api.get('/api/v1/auth/logout', auth.logout);
api.get('/api/v1/auth/refresh-token', auth.refresh);

api.listen(conf.get('server').port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${conf.get('server').port}`);
});
