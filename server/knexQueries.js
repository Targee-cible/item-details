const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'targetItem',
  },
});

exports.getAllSizing = ((req, res) => {
  knex('sizing')
    .where({})
    .then((data) => {
      // console.log(JSON.parse(JSON.stringify(data)));
      res.send(JSON.parse(JSON.stringify(data)));
    })
    .catch(() => {
      res.sendStatus(500);
    })
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
    .catch(() => {
      res.sendStatus(500);
    });
});

exports.getAllDetail = ((req, res) => {
  const id = req.params.itemId;
  knex('detail')
    .where({ id })
    .then((data) => {
      // console.log(JSON.parse(JSON.stringify(data)));
      res.send(JSON.parse(JSON.stringify(data)));
    })
    .catch(() => {
      res.sendStatus(500);
    });
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
    // .where({itemId: req.body.itemId})
    // .then((data) => {
    //   // console.log(data);
    //   console.log(JSON.parse(JSON.stringify(data)).length);
      knex('questions')
        .insert(post)
        .then(() => {
          res.sendStatus(200);
          // console.log('posted');
          // knex('questions')
          //   .where({itemId: req.body.itemId})
          //   .then((data) => {
          //     console.log(data.length);
          //   })
        })
        .catch(() => {
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