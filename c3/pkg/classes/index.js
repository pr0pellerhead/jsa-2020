var mongoose = require('mongoose');

const Class = mongoose.model(
    'class', {
        name: String,
        semester: Number,
        credits: Number,
        active: Boolean,
        teacher: String
    },
    'classes'
);

const create = (data) => {
    return new Promise((success, fail) => {
        let s = new Class(data);
        s.save(err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

// const createCB = (data, cb) => {
//     let s = new Class(data);
//     s.save(err => {
//         if(err) {
//             return cb(err);
//         }
//         return cb(null);
//     });
// };

const getAll = () => {
    return new Promise((success, fail) => {
        Class.find({}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const getOne = (id) => {
    return new Promise((success, fail) => {
        Class.findOne({ _id: id }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Class.deleteOne({ _id: id }, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const update = (id, data) => {
    return new Promise((success, fail) => {
        Class.updateOne({ _id: id }, data, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

// Ova ne e potrebno zatoa shto kodot za update i patch ja koristi 
// istata mongoose funkcija "updateOne"
// 
// const patch = (id, data) => {
//     return new Promise((success, fail) => {
//         Class.updateOne({_id: id}, data, err => {
//             if(err) {
//                 return fail(err);
//             }
//             return success();
//         });
//     });
// };

module.exports = {
    create,
    getAll,
    getOne,
    remove,
    update,
    // patch
};