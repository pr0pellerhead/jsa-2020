var mongoose = require('mongoose');

const Note = mongoose.model(
    'note',
    {
        owner_id: String,
        note_title: String,
        note: String,
        pinned_by: [String],
        shared: [String],
        tags: [String],
        color: String
    },
    'notes'
);

const addNew = (data) => {
    return new Promise((success, fail) => {
        let note = new Note(data);
        note.save(err => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    })
};

const getAllByUserIDEmail = (uid, email) => {
    return new Promise((success, fail) => {
        Note.find({ $or: [{ owner_id: uid }, { shared: email }] }, (err, data) => {
            if(err) {
                return fail(err);
            }
            return success(data);
        })
    });
};

const getAllByID = (id, uid) => {
    return new Promise((success, fail) => {
        Note.find({ _id: id, owner_id: uid }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
};

const remove = (id, uid) => {
    return new Promise((success, fail) => {
        Note.deleteOne({owner_id: uid, _id: id}, err => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

module.exports = {
    addNew,
    getAllByUserIDEmail,
    getAllByID,
    remove
};

