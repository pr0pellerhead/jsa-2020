const validator = require('node-input-validator');

const schema = {
    first_name: 'required|minLength:2',
    last_name: 'required|minLength; 2',
    gpa: 'required|between:5,10',
};

const schemaUpdate = {
    gpa: 'required|between:5,10',
};

const validate = (data) => {
    let v = validator.Validator(data, schema);
    return v.check();
}

const validateUpdate = (data) => {
    let v = validator.Validator(data, schemaUpdate);
    return v.check();
}

module.exports = {
    validate,
    validateUpdate
};