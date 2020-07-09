const express = require('express');
const bodyParser = require('body-parser');
const config = require('./pkg/config');
const db = require('./pkg/db');

const students = require('./handlers/students');
const classes = require('./handlers/classes');

db.init();

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
api.get('/classes', classes.getAll);
api.get('/classes/:id', classes.getSingle);
api.post('/classes', classes.create);
api.delete('/classes/:id', classes.remove);
api.put('/classes/:id', classes.update);
api.patch('/classes/:id', classes.patch);

// ... resource

api.listen(config.get('server').port, err => {
    if(err) {
        console.error(err);
    }
    console.log('Service started on port', config.get('server').port);
});

// 1. Development environment (локален компјутер)
// 1.5. Testing environment (QA)
// 2. Staging environment (тест околина за клиентот да ја види апликацијата)
// 3. Production environment (официјалната локација каде е поставена стабилната верзија на апликацијата)

// http://127.0.0.1:8080/search?q=lorem
// http://127.0.0.1:8080/search?q=ipsum (req.query.q)

