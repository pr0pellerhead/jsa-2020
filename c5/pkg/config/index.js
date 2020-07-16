const fs = require('fs');

const confFile = './config.json';
var config = null;

const get = (pero) => {
    if(config === null) {
        let data = fs.readFileSync(confFile, 'utf8');
        config = JSON.parse(data);
    }
    if(config[pero]) {
        return config[pero];
    }
    return null;
};

module.exports = {
    get
};