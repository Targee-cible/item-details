const db = require('./indexCouch.js');
const gen = require('./genFunc.js');
const detailJSON = require('../detailJSON.js');

// need 99 cyles of detail => maxCountDetail = 99
const maxCountDetail = 30; // reassign for when you want seeding to end
let startCountDetail = 0;
// need 50 cycles of questions => maxCountQuestions = 49
const maxCountQuestions = 30;
let startCountQuestions = 0;
let totalCountDetail = 0;
let totalCountQuestions = 0;
const startTime = new Date();

const sizingArr = gen.generateSizingJSON();

// db.bulk({docs: sizingArr})
//   .then((body) => {
//     console.log('size added: ', body.length);
//     recursiveSeedQuestions(0,maxCountQuestions);
//   })

const recursiveSeedQuestions = (currentTime, end) => {
  const questionArr = gen.generateQuestionJSON(20000);
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
        recursiveSeedDetail(1, maxCountDetail);
      }
    })
};

// const recursiveSeedDetail = (currentTime, end) => {
//   const detailArr = gen.generateDetailJSON(20000, totalCountDetail);

//   db.bulk({docs: detailArr})
//     .then((rows) => {
//       startCountDetail++;
//       totalCountDetail+= rows.length;
//       if (currentTime !== end) {
//         recursiveSeedDetail(currentTime + 1, end);
//       }
//       if (currentTime === end) {
//         console.log('time to complete all seeding', new Date() - startTime);
//         console.log('done seeding detail');
//         console.log('total questions added', totalCountQuestions);
//         console.log('total detail added', totalCountDetail);
//       }
//     })
// }

db.bulk({docs: detailJSON})
  .then((rows) => console.log(rows.length));
