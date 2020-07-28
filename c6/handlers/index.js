const string = require('../pkg/string');
const conf = require('../pkg/config');
const fs = require('fs');

const saveFile = (req, res) => {
    if (req.files.document == undefined) {
        return req.status(400).send('bad requiest');
    }
    let file = `${string.random(5)}_${req.files.document.name.replace(/ /g, '_')}`;
    req.files.document.mv(`${conf.get('server').upload_folder}/${file}`);
    res.status(201).send({filename: file});
}

const getFile = (req, res) => {
    let path = `${conf.get('server').upload_folder}/${req.params.fid}`;
    if(fs.existsSync(path)){
        res.download(path);
    } else {
        res.status(404).send('not found');
    }
}

module.exports = {
    saveFile,
    getFile
};