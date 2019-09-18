const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'pw123'));
const session = driver.session();


exports.getAllSizing = ((req, res) => {
  var getSizingPromise = session.readTransaction((transaction) => {
    var result = transaction.run('MATCH (n:sizing) RETURN n');
    return result
  });
  getSizingPromise
    .then((result) => {
      var arr = result.records.map((record) => {
        var obj = record.get('n');
        return obj.properties;
      })
      res.send(arr);
    })
});

exports.getAllQuestions = ((req, res) => {
  const id = req.params.itemId;

});

exports.getAllDetail = ((req, res) => {
  const id = req.params.itemId;
 
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

});

exports.updateDetail = ((req, res) => {
  console.log(req.body);
  const updateObj = {};
  const key = req.body.update.key;
  let update = req.body.update.value;

  updateObj[key] = update;
  const id = req.body.itemId;
  
});

exports.deleteQuestion = ((req, res) => {
  const id = req.body.qId;
  
});