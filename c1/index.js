const express = require('express');
const handlers = require('./handlers');

const api = express();

api.get('/students', handlers.getAllStudents);
api.get('/students/:id', handlers.getSingleStudent);
api.post('/students', handlers.createStudent);
api.delete('/students/:id', handlers.removeStudent);
api.put('/students/:id', handlers.updateStudent);
api.patch('/students/:id', handlers.patchStudent);

api.listen(8090, err => {
    if(err) {
        console.error(err);
    }
    console.log('Service started on port 8090');
});