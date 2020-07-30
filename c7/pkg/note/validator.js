var validator = require('node-input-validator');

const createSchema = {
    owner_id: 'required|minLength:24',
    note: 'required|minLength:1',
};

const create = (data) => {
    let v = new validator.Validator(data, createSchema);
    return v.check();
};

module.exports = {
    create
}