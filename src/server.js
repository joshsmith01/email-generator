const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fse = require('fs-extra');
const Handlebars = require('handlebars');
const fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


Handlebars.registerHelper('times', function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Gotta get those headers right for both directions on the server. Remember there is a response that comes back.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/article', function (req, res) {
        const articles = req.body.articles;


        // Register all partials in the directory
        let partialsDir = 'src/temp-src/partials';
        let filenames = fs.readdirSync(partialsDir);
        filenames.forEach(function (filename) {
            let matches = /^([^.]+).hbs$/.exec(filename);
            if (!matches) {
                return;
            }
            let name = matches[1];
            let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
            Handlebars.registerPartial(name, template);
        });


        // convert the object into an array -JMS
        // TODO: Do I want an Object or an Array? I think an array, because I think I'll want to add drag and drop ordering to this UI. -JMS
        const arr = Object.keys(articles).map(key => articles[key]);
        const arrCount = arr.length;


        // Async with callbacks:

        console.log('POSTed State: ' + JSON.stringify(articles));

        let source = fs.readFileSync("src/temp-src/index.html", 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        });


        let template = Handlebars.compile(source);

        let data = {
            "count": arrCount,
            articles: arr
        };
        let result = template(data);


        fse.writeFile("src/temp-dist/test.html", result, function (err) {
            if (err) {
                return console.log(err);
            }
        });


    }
);


app.listen(5000, () => console.log('Example app listening on port 5000!'));