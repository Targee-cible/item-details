const db = require('./indexCouch.js');
const gen = require('../generateCSV.js');

// need 99 cyles of detail => maxCountDetail = 99
const maxCountDetail = 99; // reassign for when you want seeding to end
let startCountDetail = 0;
// need 50 cycles of questions => maxCountQuestions = 49
const maxCountQuestions = 9;
let startCountQuestions = 0;
let totalCountDetail = 0; 
let totalCountQuestions = 0;
const startTime = new Date();

const sizingArr = gen.generateSizingJSON();

db.bulk({docs: sizingArr})
  .then((body) => {
    console.log('size added: ', body.length);
    recursiveSeedQuestions(0,2);
  })
  
  const recursiveSeedQuestions = (currentTime, end) => {
    const questionArr = gen.generateQuestionJSON();
    db.bulk({docs: questionArr})
      .then((rows) => {
        startCountQuestions++;
        totalCountQuestions+= rows.length;
        if (currentTime !== end) {
          recursiveSeedQuestions(currentTime + 1, end);
        } 
        if (currentTime === end) {
          console.log('time to complete seed question', new Date() - startTime);
          console.log('done seeding questions, added', totalCountQuestions);
        }
      })
  };