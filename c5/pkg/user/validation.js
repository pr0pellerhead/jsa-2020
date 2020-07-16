var validator = require('node-input-validator');

const registerSchema = {
    first_name: 'required|minLength:2',
    last_name: 'required|minLength:2',
    email: 'required|email',
    password: 'required|minLength:1',
    password2: 'required|minLength:1',
};

const loginSchema = {
    email: 'required|email',
    password: 'required|minLength:1'
};

const register = (data) => {
    let v = new validator.Validator(data, registerSchema);
    return v.check();
};

const login = (data) => {
    let v = new validator.Validator(data, loginSchema);
    return v.check();
};

module.exports = {
    register,
    login
};