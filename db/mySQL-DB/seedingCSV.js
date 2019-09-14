const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');

const maxCount = 15; // reassign for when you want seeding to end
let startCount = 0;
const startTime = new Date();

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


// // INSERTING DATA FOR QUESTIONS
// const seedQuestions = (fileCount) => {
//   const path = `./db/CSVdata/questionData${fileCount}.csv`
//   const questionQuery = `LOAD DATA LOCAL INFILE ?
//   INTO TABLE questions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
//   return new Promise((resolve, reject) => {
//     db.query(questionQuery, path, (err, res) => {
//       if (err) reject(err);
//       if (res) resolve(res.affectedRows); 
//     });
//   }) 
// }


//   seedQuestions(fileNum)
//     .then((rows) => {
//       console.log('added rows', rows);
//       if (currentTime !== end) {
//         recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
//       } 
//       return Promise.resolve('done questions');
//       console.log('done seeding table');
//     })
// }

// const recursiveSeedQuestions = (fileNum, currentTime, end) => {
//   seedQuestions(fileNum)
//     .then((rows) => {
//       console.log('added rows', rows);
//       if (currentTime !== end) {
//         recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
//       } 
//       return Promise.resolve('done questions');
//       console.log('done seeding table');
//     })
// }


// recursiveSeed(0, 0, 2);


// // INSERTING DATA FOR ITEM-DETAIL
const seedDetail = (fileCount) => {
  if (fileCount > 10) {
    fileCount = fileCount.toString().split('').pop();
  }
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
      startCount++;
      console.log('count', startCount);
      console.log('added rows', rows);
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      } 
      if (currentTime === end) {
        db.end();
        console.log(new Date() - startTime);
      }
      console.log('done seeding detail');
    })
}

recursiveSeedDetail(0, startCount, maxCount);

// // chain the functions
// seedSize()
//   .then((rowsAdded) => {
//     console.log('seeded sizing data rows:' + rowsAdded);
//     recursiveSeedQuestions(0, 0, 2)
//       .then((done) => {
//         console.log(done);
//       })  
//   })
  