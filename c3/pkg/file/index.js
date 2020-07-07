const fs = require('fs');

const write = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, (err) => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

const append = (filename, data) => {
    return new Promise((success, fail) => {
        fs.appendFile(filename, data, (err) => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    });
};

const read = (filename) => {
    return new Promise((success, fail) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if(err) {
                return fail(err);
            }
            return success(data);
        })
    })
};

const remove = (filename) => {
    return new Promise((success, fail) => {
        fs.unlink(filename, err => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

module.exports = {
    write,
    append,
    read,
    remove
};