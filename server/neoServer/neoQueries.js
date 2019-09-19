const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'pw123'));
const session = driver.session();


exports.getAllSizing = ((req, res) => {
  const getSizingPromise = session.readTransaction((transaction) => {
    const result = transaction.run('MATCH (n:sizing) RETURN n');
    return result
  });
  getSizingPromise
    .then((result) => {
      const arr = result.records.map((record) => {
        const obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    })
});

exports.getAllQuestions = ((req, res) => {
  const id = req.params.itemId;
  const query = `match (n:questions) where n.itemId	='${id}' return n`;

  const getQuestionPromise = session.readTransaction((transaction) => {
    const result = transaction.run(query);
    return result
  });

  getQuestionPromise
    .then((result) => {
      const arr = result.records.map((record) => {
        const obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    })
});

exports.getAllDetail = ((req, res) => {
  const id = req.params.itemId;
  const query = `match (n:detail) where n.itemId	='${id}' return n`;

  const getDetailPromise = session.readTransaction((transaction) => {
    const result = transaction.run(query);
    return result
  });

  getDetailPromise
    .then((result) => {
      const arr = result.records.map((record) => {
        const obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    })
});

exports.addQuestion = ((req, res) => {
  const itemId = req.body.itemId;
  const question = req.body.question;
  const asker = req.body.asker;
  const dateAsked = new Date();
  const id = 20000000 + (Math.floor(Math.random() * 1000));

  const query = `create (n:questions {id:${id}, itemId:'${itemId}', question:'${question}', asker:'${asker}', dateAsked:'${dateAsked}', answer:'null', nameOfResponder:'null', dateAnswered:'null', helpfulCount:'null', unhelpfulCount:'null', targetTeamMember:'null'}) return n`;

  const createQuestionPromise = session.readTransaction((transaction) => {
    const result = transaction.run(query);
    return result
  });

  createQuestionPromise
    .then((result) => {
      const arr = result.records.map((record) => {
        const obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    });
});

exports.updateDetail = ((req, res) => {
  const key = req.body.update.key;
  let update = req.body.update.value;
  const id = req.body.itemId;
  const query = `match (n:detail) where n.itemId='${id}' SET n.${key}='${update}' return n`;

  const updateDetailPromise = session.readTransaction((transaction) => {
    const result = transaction.run(query);
    return result
  });
  updateDetailPromise
    .then((result) => {
      const arr = result.records.map((record) => {
        const obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    });
});

exports.deleteQuestion = ((req, res) => {
  const id = req.body.qId;
  const itemId = req.body.itemId;
  const query = `match (n:questions {itemId:'${itemId}', id:'${id}' }) delete n`;
  
  const deleteQuestionPromise = session.readTransaction((transaction) => {
    const result = transaction.run(query);
    return result
  });
  deleteQuestionPromise
    .then(() => {
      res.sendStatus(200);
    });
});