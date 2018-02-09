const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs-extra');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Gotta get those headers right for both directions on the server. Remember there is a response that comes back.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/article',function(req, res) {
        console.log('Hi from POST');
        const articles = req.body.articles;

        // convert the object into an array -JMS
        let arr = Object.keys(articles).map(key => articles[key]);


        // Am I doing this correctly? -JMS
        console.log(arr);

        // Send a response back to the client -JMS
        res.send('Hi from server POST response');

        // Write state to a file on the server -JMS
        fs.writeFile('src/myfile.js', JSON.stringify(arr), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });


        // Async with callbacks:
        fs.copy('src/myfile.js', 'tmp/mynewfile.js', err => {
            if (err) {
                return console.error(err)
            } else {
                console.log('Copied the file myfile.js!');
            }
        })


}
);



app.listen(5000, () => console.log('Example app listening on port 5000!'));