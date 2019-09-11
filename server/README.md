## API Calls for server-side

# GET requests
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
      // console.log('Here are the questions at this item id.', results);
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

# POST requests
app.post('api/post', (req, res) => {
  // should create a new item
});

# PUT requests
app.put('api/update/:itemId', (req, res) => {
  // should update an item
});

# DELETE requests
app.delete('api/delete/:itemId', (req, res) => {
  // should delete an item
});