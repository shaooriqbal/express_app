const http = require('http');
const fs = require('fs');
const ld = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url);
    const num = ld.random(0, 20);
    console.log(num);

    // sending text
    // res.setHeader('content-type', 'text/plain');
    // res.write('Hello node');
    // res.end();

    let path = './views/';
    switch (req.url) {
        case '/': path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about': path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

    // sending html
    res.setHeader('content-Type', 'text/html');
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});
server.listen(3000, 'localhost', () => {
    console.log('Listening for request on 3000 port');
});