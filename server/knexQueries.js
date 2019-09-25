const LRU = require('lru-cache');
const options = {
  max: 500,
  max_age: 1000 * 60 * 60,
};
const cache = new LRU(options);

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '13.57.223.213',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'targetItem',
  },
});

exports.getAllSizing = ((req, res) => {
  const cacheData = cache.get('sizing');
  if (!cacheData) {
    knex('sizing')
    .where({})
    .then((response) => {
      const data = JSON.parse(JSON.stringify(response));
      cache.set('sizing', data);
      // console.log(JSON.parse(JSON.stringify(data)));
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  } else {
    res.send(cacheData);
  }
});

exports.getAllQuestions = ((req, res) => {
  const id = req.params.itemId;
  knex('questions')
    .where({ itemId: id })
    .orderBy('id', 'desc')
    .limit(5)
    .then((data) => {
      // console.log(JSON.parse(JSON.stringify(data)));
      res.send(JSON.parse(JSON.stringify(data)));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

exports.getAllDetail = ((req, res) => {
  const id = req.params.itemId;
  const cache_key = 'detail:' + id;
  const cacheData = cache.get(cache_key);
  if (!cacheData) {
    knex('detail')
    .where({ id })
    .then((response) => {
      const data = JSON.parse(JSON.stringify(response));
      cache.set('detail:' + id, data);
      // console.log(JSON.parse(JSON.stringify(response)));
      res.send(data);
    })
    .catch(() => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    res.send(cacheData);
  }
  
});

exports.addQuestion = ((req, res) => {
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
    targetTeamMember: null,
  };

  knex('questions')
      knex('questions')
        .insert(post)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    // })
});

exports.updateDetail = ((req, res) => {
  console.log(req.body);
  const updateObj = {};
  const key = req.body.update.key;
  let update = req.body.update.value;

  updateObj[key] = update;
  const id = req.body.itemId;
  knex('detail')
    .where({ id })
    .update(updateObj)
    .then(()=>{
      knex('detail')
        .where(knex.raw('id=?', [id]))
        .then((data) => {
          console.log(data);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
});

exports.deleteQuestion = ((req, res) => {
  const id = req.body.qId;
  knex('questions')
    .where(knex.raw('id=?', [id]))
    .then((data) => {
      const itemId = data[0].itemId;
      knex('questions')
        .where(knex.raw('id=?', [id]))
        .del()
        .then(()=> {
          knex('questions')
            .where({id})
            .then((data) => {
              console.log(data.length, 'should be 0');
              res.sendStatus(200);
            })
        })
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});