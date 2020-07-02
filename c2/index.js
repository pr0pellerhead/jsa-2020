const fs = require('fs');

// fs.writeFile('test.txt', 'Hello world', (err) => {
//     if(err) {
//         return console.error(err);
//     }
//     console.log('Write successull');
// });

// fs.appendFile('test.txt', 'hello worldz', (err) => {
//     if(err) {
//         return console.error(err);
//     }
//     console.log('Write successull');
// });

// fs.readFile('test.txt', 'utf8', (err, data) => {
//     if(err) {
//         return console.error(err);
//     }
//     console.log(data);
// });

// fs.unlink('test.txt', (err) => {
//     if(err) {
//         return console.error(err);
//     }
// });


const writeFile = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, (err) => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

const appendFile = (filename, data) => {
    return new Promise((success, fail) => {
        fs.appendFile(filename, data, (err) => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    });
};

writeFile('test.txt', 'Здраво Свету!')
    .then(() => {
        console.log('Write successfull!');
        return appendFile('test.txt', ' Helloz!');
    })
    .then(() => {
        console.log('Append successfull');
    })
    .catch((err) => {
        console.error(err);
    });





