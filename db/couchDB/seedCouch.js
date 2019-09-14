const db = require('./indexCouch.js');
const gen = require('./dataGenFunc.js');

const sizingArr = gen.generateSizingJSON();
const questionArr = gen.generateQuestionJSON();

db.bulk({docs: sizingArr})
  .then((body) => {
    console.log('size added: ', body.length);
    return db.bulk({docs: questionArr})
  })
  .then((body) => {
    console.log('question added: ', body.length);
  })
