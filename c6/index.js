const express = require('express');
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');
const conf = require('./pkg/config');
const handlers = require('./handlers');

const api = express();

api.use(
    jwt({
        secret: conf.get('server').key,
        algorithms: ['HS256']
    })
);

api.use(fileupload({
    limits: {fileSize: 10 * 1024 * 1024} // max 10 megabytes
}));

api.post('/api/v1/files', handlers.saveFile);
api.get('/api/v1/files/:fid', handlers.getFile);

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
