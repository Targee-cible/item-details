const express = require('express');
const nr = require('newrelic');
const bodyParser = require('body-parser');


const app = express();
const port = 3001;
const db = require('./knexQueries.js');


let allowCrossDomain = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', "*");
 res.header('Access-Control-Allow-Headers', "*");
 next();
}

app.use(express.static('client/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

// Get request to get all item details at particular item id.
app.get('/api/items/:itemId', (req, res) => {
  db.getAllDetail(req, res);
});

// Get request to get all item-related questions at particular item id.
app.get('/api/questions/:itemId', (req, res) => {
  db.getAllQuestions(req, res);
});

// Get request to get all type-related sizing information at particular item id.
app.get('/api/sizing/:itemId', (req, res) => {
  db.getAllSizing(req, res);
});

app.post('/api/post', (req, res) => {
  db.addQuestion(req, res);
});

app.put('/api/update', (req, res) => {
  db.updateDetail(req, res);
});

app.delete('/api/delete', (req, res) => {
  db.deleteQuestion(req, res);
});

app.listen(port, () => {
  console.log(`Item details service listening on port ${port}!`);
});
