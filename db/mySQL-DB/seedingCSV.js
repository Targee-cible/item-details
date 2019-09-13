const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');

// INSERTING DATA FOR SIZING TABLE
var sizeArr = genFunc.createSizeBatch();
const sizingQuery = `LOAD DATA LOCAL INFILE './db/CSVdata/sizingData.csv' 
  INTO TABLE sizing FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
db.query(sizingQuery, (err, res) => {
  if (err) throw err;
  if (res) console.log('seeded sizing data rows:' + res.affectedRows);
});

// // INSERTING DATA FOR QUESTIONS
// for (var i = 0; i <= 500; i++) {
//   var quesArr = genFunc.createQuestionBatch();
//   const questionQuery = `INSERT INTO questions (itemId, question, 
//     asker, dateAsked, answer, nameOfResponder, dateAnswered, helpfulCount, 
//     unhelpfulCount, targetTeamMember) VALUES ?`;
//   db.query(questionQuery, [quesArr], (err, res) => {
//     if (err) throw err;
//     if (res) console.log('seeded questions data rows:' + res.affectedRows);
//   });
// }

// // INSERTING DATA FOR ITEM-DETAIL
// var insertBatchDetail = function() {
//   for (var i = 0; i < 3; i++) {
//     const allDetail = [];
//     const generatedDetail = genFunc.createDetailBatch();
//     generatedDetail.forEach((item) => {
//       const detailArr = Object.keys(item).map((key) => item[key]);
//       allDetail.push(detailArr)
//     })
//     const detailQuery = `INSERT INTO detail
//           (itemId, fitAndSTylePointOne, fitAndSTylePointTwo,
//           fitAndSTylePointThree, fitAndSTylePointFour, fitAndSTylePointFive, 
//           fitAndSTyleBlurb, sizing, material, fit, length, features, neckline, 
//           itemStyle, garmentCuffCutType, garmentSleeveStyle, careAndCleaning, 
//           TCIN, UPC, DPCI, origin, recycledPolyester, fastShipping, estimatedShipDimensions, 
//           estimatedShipWeight, type) values ?`;
//     return new Promise( db.query(detailQuery, [allDetail], (err, res) => {
//       if (err) throw err;
//       if (res) console.log('seeded detail data rows:' + res.affectedRows);
//     });
//   }
// };