const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/article', function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('Happy Times');

  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.description;
  const image = req.body.image;

  fs.appendFile('mynewfile1.txt', 'Hello content!', function(err) {
    if (err) throw err;
    console.log('Saved!');
  });

  return res.send(
    JSON.stringify({
      title: title,
      subtitle: subtitle,
      description: description,
      image: image,
    }),
  );
});
app.listen(port, () => console.log(`Server responded on port ${port}`));
