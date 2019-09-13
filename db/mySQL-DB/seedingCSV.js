const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');


// // INSERTING DATA FOR SIZING TABLE
// const seedSize = () => {
//   const sizingQuery = `LOAD DATA LOCAL INFILE './db/CSVdata/sizingData.csv' 
//     INTO TABLE sizing FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
//   return new Promise((resolve, reject) => {
//     db.query(sizingQuery, (err, res) => {
//       if (err) reject(err);
//       if (res) resolve(res.affectedRows); 
//     });
//   }) 
// };
// seedSize()
//   .then((rowsAdded) => {
//     console.log('seeded sizing data rows:' + rowsAdded);
//     db.end();
//   })

// INSERTING DATA FOR QUESTIONS
const seedQuestions = () => {
  var quesArr = genFunc.createQuestionBatch();
  const questionQuery = `LOAD DATA LOCAL INFILE './db/CSVdata/questionData.csv' 
  INTO TABLE questions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
  return new Promise((resolve, reject) => {
    db.query(questionQuery, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.affectedRows); 
    });
  }) 
}

const recursiveSeed = (currentTime, end) => {
  seedQuestions()
    .then((rows) => {
      console.log('added rows', rows);
      if (currentTime !== end) {
        recursiveSeed(currentTime+1, end);
      } 
      console.log('done seeding');
    })
}


recursiveSeed(0,2);


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