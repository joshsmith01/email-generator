const express = require('express');
const app = express();
const port = 5000;

var fs = require('fs');
app.get('/ping', function (req, res) {
    console.log('Happy Times');

    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    return res.send('pong');
});
app.listen(port, () => console.log(`Server responded on port ${port}`));