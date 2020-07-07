const express = require('express');
const bodyParser = require('body-parser');

const students = require('./handlers/students');
const classes = require('./handlers/classes');

const api = express();
api.use(bodyParser.json());

// students resource
api.get('/students', students.getAll);
api.get('/students/:id', students.getSingle);
api.post('/students', students.create);
api.delete('/students/:id', students.remove);
api.put('/students/:id', students.update);
api.patch('/students/:id', students.patch);

// classes resource
api.get('/classes', classes.ghetAll);
api.get('/classes/:id', classes.ghetSingle);
api.post('/classes', classes.create);
api.delete('/classes/:id', classes.remove);
api.put('/classes/:id', classes.update);
api.patch('/classes/:id', classes.patch);

// ... resource

api.listen(8090, err => {
    if(err) {
        console.error(err);
    }
    console.log('Service started on port 8090');
});