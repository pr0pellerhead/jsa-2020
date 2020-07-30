const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const config = require('./pkg/config');
const db = require('./pkg/db');
const handlers = require('./handlers');

db.init();

let api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: conf.get('server').key,
        algorithms: ['HS256']
    })
);

api.get('/api/v1/notes', handlers.getAllNotes);
api.get('/api/v1/notes/:id', handlers.getOneNote);
api.post('/api/v1/notes', handlers.createNote);
api.put('/api/v1/notes/:id', handlers.updateNote);
api.patch('/api/v1/notes/:id/pin', handlers.pinNote);
api.patch('/api/v1/notes/:id/share', handlers.shareNote);
api.delete('/api/v1/notes/:id', handlers.deleteNote);
api.get('/api/v1/notes/search', handlers.searchNotes);

api.listen(config.get('server').port, err => {
    if(err) {
        return console.error(err);
    }
    console.log('Service successfully started on port', congig.get('server').port);
});