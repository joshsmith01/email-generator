const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs-extra');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/article',function(req, res) {
        console.log('Hi from POST');
        console.log(req.body.firstParam);
        res.send('Hi from booger');


        // Async with callbacks:
        // fs.copy('src/myfile.js', 'tmp/mynewfile.js', err => {
        //     if (err) {
        //         return console.error(err)
        //     } else {
        //         console.log('Copied the file myfile.js!');
        //     }
        // })


}
);



app.listen(5000, () => console.log('Example app listening on port 5000!'));