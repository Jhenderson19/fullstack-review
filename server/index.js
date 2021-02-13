const express = require('express');
const bodyParser = require('body-parser');
const gitAPI = require('../helpers/github');
const db = require('../database/index');
let app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static files
app.use(express.static(__dirname + '/../client/dist'));

//request handling
app.post('/repos', function (req, res) {

  // This route should take the github username provided
  gitAPI.getReposByUsername(req.body.user)

  // and get the repo information from the github API, then
  .then((apiResponse) => {

    // save the repo information in the database
    return db.save(apiResponse.data);

  }).then(() => {
    res.status(201).send();
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!

  db.get25().then((results) => {

    // This route should send back the top 25 repos
    res.status(200).json(results);

  }).catch((e) => {
    res.status(500).send(e);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
