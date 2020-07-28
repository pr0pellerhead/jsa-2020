const validate = require('../pkg/user/validation');
const user = require('../pkg/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var config = require('../pkg/config');
const mailer = require('../pkg/mailer');

const register = (req, res) => {
    validate.register(req.body)
        .then(matches => {
            if (!matches) {
                throw {message: 'Bad request', code: 400};
            }
            if (req.body.password !== req.body.password2) {
                throw { message: 'Bad request', code: 400 };
            }
            return user.getUserByEmail(req.body.email);
        })
        .then(u => {
            if (u !== null) {
                throw { message: 'Conflict', code: 409 };
            }
            req.body.password = bcrypt.hashSync(req.body.password);
            return user.createUser(req.body);
        })
        .then(() => {
            res.status(201).send('created');
        })
        .catch(err => {
            res.status(err.code).send(err.message);
        });
};

const login = (req, res) => {
    validate.login(req.body)
        .then(matches => {
            if (!matches) {
                throw { message: 'Bad request', code: 400 };
            }
            return user.getUserByEmail(req.body.email);
        })
        .then(u => {
            if (u === null) {
                throw { message: 'Bad request', code: 400 };
            }
            if (!bcrypt.compareSync(req.body.password, u.password)) {
                throw { message: 'Bad request', code: 400 };
            }
            let payload = {
                uid: u._id,
                name: `${u.first_name} ${u.last_name}`,
                email: u.email,
                iat: parseInt(new Date().getTime()/1000),
                exp: parseInt((new Date().getTime() + (24 * 60 * 60 * 1000)) / 1000), // (1 * 60 * 1000) токенот истекува по една минута - 60 секунди
            };
            let token = jwt.sign(payload, config.get('server').key);
            mailer.loginNotification(`${u.first_name} ${u.last_name}`, u.email);
            res.status(200).send({token: token});
        })
        .catch(err => {
            res.status(err.code).send(err.message);
        });
};

const logout = (req, res) => {
    res.status(200).send('ok');
};

const refresh = (req, res) => {
    let payload = {
        uid: req.user.uid,
        name: req.user.name,
        email: req.user.email,
        iat: parseInt(new Date().getTime() / 1000),
        exp: parseInt((new Date().getTime() + (24 * 60 * 60 * 1000)) / 1000), // (1 * 60 * 1000) токенот истекува по една минута - 60 секунди
    };
    let token = jwt.sign(payload, config.get('server').key);
    res.status(200).send({ token: token });
};

module.exports = {
    register,
    login,
    logout,
    refresh
};