const validator = require('node-input-validator');

const schema = {
    name: 'required|minLength:1',
    semester: 'required|between:0,10',
    credits: 'required|between:2,12',
    active: 'required',
    teacher: 'required|minLength:10',
};

const validate = (data) => {
    let v = new validator.Validator(data, schema);
    return v.check();
};

module.exports = {
    validate
};