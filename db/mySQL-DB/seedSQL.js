const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');
// const sizeJSON = require('../JSONdata/sizingData.js');
// const detailJSON = require('../JSONdata/detailData.js');
// const questionJSON = require('../JSONdata/questionsData.js');

// INSERTING DATA FOR SIZING TABLE
var sizeArr = genFunc.createSizeBatch();
const sizingQuery = `INSERT INTO sizing
    (type, size, neck, chest, sleeve)
    VALUES ?`;
db.query(sizingQuery, [sizeArr], (err, res) => {
  if (err) throw err;
  if (res) console.log('seeded sizing data rows:' + res.affectedRows);
});

// // INSERTING DATA FOR QUESTIONS
// for (var i = 0; i <= 5; i++) {
//   var quesArr = genFunc.createQuestionBatch();
//   const questionQuery = 'INSERT INTO questions (itemId, question, asker, dateAsked, answer, nameOfResponder, dateAnswered, helpfulCount, unhelpfulCount, targetTeamMember) VALUES ?';
//   db.query(questionQuery, [quesArr], (err, res) => {
//     if (err) throw err;
//     if (res) console.log('seeded questions data rows:' + res.affectedRows);
//   });
// }



// const questionQuery = 'INSERT INTO questions (itemId, question, asker, dateAsked, answer, nameOfResponder, dateAnswered, helpfulCount, unhelpfulCount, targetTeamMember) VALUES ?';
// db.query(questionQuery, [allQs], (err, res) => {
//   if (err) throw err;
//   if (res) console.log('seeded questions data rows:' + res.affectedRows);
// });

// INSERTING DATA FOR ITEM-DETAIL
// const allDetail = genFunc.createDetailBatch();
// console.log(allDetail);
// detailJSON.forEach((itemObj) => {
//   const detailArr = Object.keys(itemObj).map((key) => itemObj[key]);
//   allDetail.push(detailArr);
// });

// const detailQuery = `INSERT INTO detail
//       (itemId, fitAndSTylePointOne, fitAndSTylePointTwo,
//       fitAndSTylePointThree, fitAndSTylePointFour, fitAndSTylePointFive, fitAndSTyleBlurb, sizing, material, fit, length, features, neckline, itemStyle, garmentCuffCutType, garmentSleeveStyle, careAndCleaning, TCIN, UPC, DPCI, origin, recycledPolyester, fastShipping, estimatedShipDimensions, estimatedShipWeight, type)
//       values ?`;
// db.query(detailQuery, [allDetail], (err, res) => {
//   if (err) throw err;
//   if (res) console.log('seeded detail data rows:' + res.affectedRows);
// });

db.end();
