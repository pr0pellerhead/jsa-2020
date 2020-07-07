const fs = require('fs');

const confFile = './config.json';
var config = null;

const get = (part) => {
    if(config === null) {
        let data = fs.readFileSync(confFile, 'utf8');
        config = JSON.parse(data);
    }
    if(config[part]) {
        return config[part];
    }
    return null;
};

module.exports = {
    get
};