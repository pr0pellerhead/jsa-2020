// mongodb+srv://<username>:<password>@cluster0-c3iyx.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose');
const config = require('../config');

const init = () => {
    let username = config.get('db').username;
    let password = config.get('db').password;
    let host = config.get('db').host;
    let dbname = config.get('db').dbname;

    let uri = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        if(err) {
            return console.error(err);
        }
        return console.log('Successfully connected to database!');
    });
};

module.exports = {
    init
};
