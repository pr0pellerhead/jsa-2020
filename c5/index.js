const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const db = require('./pkg/db');
const conf = require('./pkg/config');
const auth = require('./handlers/auth');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: conf.get('server').key,
        algorithms: ['HS256']
    }).unless({
        path: [
            { url: '/api/v1/auth/register', methods: ['POST'] },
            { url: '/api/v1/auth/login', methods: ['POST'] }
        ] 
    })
);

api.post('/api/v1/auth/register', auth.register);
api.post('/api/v1/auth/login', auth.login);
api.get('/api/v1/auth/logout', auth.logout);
api.get('/api/v1/auth/refresh-token', auth.refresh);

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

api.listen(conf.get('server').port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`App started on port ${conf.get('server').port}`);
});
