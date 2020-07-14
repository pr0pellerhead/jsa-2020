const students = require('../pkg/students');
const studentValidator = require('../pkg/students/validation');

const getAll = (req, res) => {
    students.getAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('internal server error');
        });
};

const getSingle = (req, res) => {
    students.getOne(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('internal server error');
        });
};

const create = (req, res) => {
    studentValidator.validate(req.body)
        .then(matches => {
            if (!matches) {
                throw 'Bad request';
            }
            return students.create(req.body);
        })
        .then(() => {
            res.status(201).send('created');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('internal server error');
        });
};

// const createCB = (req, res) => {
//     students.create(req.body, (err) => {
//         if(err) {
//             return res.status(500).send('internal server error');
//         }
//         return res.status(500).send('created');
//     });
// };

const remove = (req, res) => {
    students.remove(req.params.id)
        .then(() => {
            res.status(204).send('no content');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('internal server error');
        });
};

const update = (req, res) => {
    students.update(req.params.id, req.body)
        .then(() => {
            res.status(204).send('no content');
        })
        .catch(err => {
            res.status(500).send('internal server error');
        });
};

const patch = (req, res) => {
    students.update(req.params.id, req.body)
        .then(() => {
            res.status(204).send('no content');
        })
        .catch(err => {
            res.status(500).send('internal server error');
        });
};

module.exports = {
    getAll,
    getSingle,
    create,
    remove,
    update,
    patch
};