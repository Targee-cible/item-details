const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');

let maxCount = 0; 
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
const seedQuestions = (fileCount) => {
  const path = `./db/CSVdata/questionData${fileCount}.csv`
  const questionQuery = `LOAD DATA LOCAL INFILE ?
  INTO TABLE questions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
  return new Promise((resolve, reject) => {
    db.query(questionQuery, path, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.affectedRows); 
    });
  }) 
}

const recursiveSeedQuestions = (fileNum, currentTime, end) => {
  seedQuestions(fileNum)
    .then((rows) => {
      console.log('added rows', rows);
      if (currentTime !== end) {
        recursiveSeedQuestions(fileNum + 1, currentTime + 1, end, table);
      } 
      console.log('done seeding table');
    })
}


// recursiveSeed(0, 0, 2);


// // INSERTING DATA FOR ITEM-DETAIL
const seedDetail = (fileCount) => {
  const path = `./db/CSVdata/detailData${fileCount}.csv`
  const questionQuery = `LOAD DATA LOCAL INFILE ?
  INTO TABLE detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
  return new Promise((resolve, reject) => {
    db.query(questionQuery, path, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.affectedRows); 
    });
  }) 
}

const recursiveSeedDetail = (fileNum, currentTime, end) => {
  seedDetail(fileNum)
    .then((rows) => {
      maxCount++;
      console.log('count', maxCount);
      console.log('added rows', rows);
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      } 
      if (maxCount === 3) {
        db.end();
      }
      console.log('done seeding detail');
    })
}

recursiveSeedDetail(0, 0, 2);

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

if (maxCount === 3) {
  db.end();
}