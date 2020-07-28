const mailgun = require("mailgun-js");
const conf = require('../config');

const mg = mailgun({ 
    apiKey: conf.get('mailer').key, 
    domain: conf.get('mailer').domain 
});

const loginNotification = (user_name, user_email) => {
    return new Promise((success, fail) => {
        const message = {
            from: "Mailgun Sandbox <postmaster@sandboxadc41bf9b93c45c18f6daaa39192ac5d.mailgun.org>",
            to: "bojang@gmail.com",
            subject: "New login on our system",
            text: `User ${user_name} with email ${user_email} just logged in.`
        };
        mg.messages().send(message, (err, body) => {
            if(err) {
                return fail(err);
            }
            return success(body);
        });
    });
};

module.exports = {
    loginNotification
};