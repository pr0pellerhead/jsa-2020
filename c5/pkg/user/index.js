var mongoose = require('mongoose');

const User = mongoose.model(
    'user',
    {
        first_name: String,
        last_name: String,
        email: String,
        password: String
    },
    'users'
);

const createUser = (data) => {
    return new Promise((success, fail) => {
        let u = new User(data);
        u.save(err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((success, fail) => {
        User.findOne({email: email}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

module.exports = {
    createUser,
    getUserByEmail
};
