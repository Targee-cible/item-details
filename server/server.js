const express = require('express');
const bodyParser = require('body-parser');
const { ItemDetails, Questions, Sizing } = require('../db/index.js');


const app = express();
const port = 3001;
const db = require('../db/index.js');

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
  const id = req.params.itemId;

  db.ItemDetails.find({ itemId: id }, (err, results) => {
    if (err || results.length === 0) {
      console.log('Error finding specific item.', err);
      res.sendStatus(404);
    } else {
      // console.log('Results finding item', results);
      res.send(results);
    }
  });
});

// Get request to get all item-related questions at particular item id.
app.get('/api/questions/:itemId', (req, res) => {
  const id = req.params.itemId;

  db.Questions.find({ itemId: id }, (err, results) => {
    if (err) {
      console.log('No questions at this item id.', err);
      res.sendStatus(404);
    } else {
      console.log('Here are the questions at this item id.', results);
      res.send(results);
    }
  });
});

// Get request to get all type-related sizing information at particular item id.
app.get('/api/sizing/:itemId', (req, res) => {
  const id = req.params.itemId;

  db.ItemDetails.find({ itemId: id }, (err, results) => {
    if (err || results.length === 0) {
      console.log('Cannot find item to get sizing.', err);
      res.sendStatus(404);
    } else {
      const itemType = results[0].type;
      db.Sizing.find({ type: itemType }, (err2, results2) => {
        if (err2) {
          console.log('Cannot find sizing for item type.', err);
          res.sendStatus(404);
        } else {
          // console.log(`Here are the sizing details for item type ${itemType}`, results2);
          res.send(results2);
        }
      });
    }
  });
});

app.post('/api/post', (req, res) => {
  const post = {
    itemId: req.body.itemId,
    question: req.body.question,
    asker: req.body.asker,
    dateAsked: new Date(),
    answer: null,
    nameOfResponder: null,
    dateAnswered: null,
    helpfulCount: null,
    unhelpfulCount: null,
    teamMember: null,
  };
  db.Questions.create([post])
    .then(() => {
      var query = db.Questions.find({ itemId: 12 });
      query.exec()
        .then((blogs) => {
          res.send(JSON.stringify(blogs));
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })

});

app.put('/api/update', (req, res) => {
  const updateObj = {};
  const key = req.body.update.key;
  let update = req.body.update.value;

  updateObj[key] = update;
  console.log(updateObj);
  const id = req.body.itemId;
  db.ItemDetails.findOneAndUpdate({ itemId: id }, { $set: updateObj })
    .then((result) => {
      const query = db.ItemDetails.find({ itemId: id });
      query.exec()
        .then((item) => {
          res.send(JSON.stringify(item));
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete('/api/delete/:itemId', (req, res) => {
  const id = req.params.itemId;
  console.log(id);
  db.ItemDetails.deleteOne({ itemId: id })
    .then(res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Item details service listening on port ${port}!`);
});
