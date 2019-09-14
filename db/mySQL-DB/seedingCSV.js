const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');
const genFunc = require('./generateFunc.js');

const maxCountDetail = 2; // reassign for when you want seeding to end
let startCountDetail = 0;
const maxCountQuestions = 2; // reassign for when you want seeding to end
let startCountQuestions = 0;
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


// INSERTING DATA FOR QUESTIONS
const seedQuestions = (fileCount) => {
  if (fileCount >= 10) {
    fileCount = fileCount.toString().split('').pop();
  }
  const path = `./db/CSVdata/questionData${fileCount}.csv`
  const questionQuery = `LOAD DATA LOCAL INFILE ?
  INTO TABLE questions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'` ;
  return new Promise((resolve, reject) => {
    db.query(questionQuery, path, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.affectedRows); 
    });
  }) 
};

const recursiveSeedQuestions = (fileNum, currentTime, end) => {
  seedQuestions(fileNum)
    .then((rows) => {
      console.log('added rows questions', rows);
      console.log('cycle', currentTime);
      if (currentTime !== end) {
        recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
      } 
      if (currentTime === end) {
        console.log('time', new Date() - startTime);
        console.log('done seeding questions');
        recursiveSeedDetail(0, startCountDetail, maxCountDetail);
      }
    })
};

recursiveSeedQuestions(0, startCountQuestions, maxCountQuestions);



// INSERTING DATA FOR ITEM-DETAIL
const seedDetail = (fileCount) => {
  if (fileCount >= 10) {
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
};

const recursiveSeedDetail = (fileNum, currentTime, end) => {
  seedDetail(fileNum)
    .then((rows) => {
      startCountDetail++;
      console.log('count', startCountDetail);
      console.log('added rows', rows);
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      } 
      if (currentTime === end) {
        db.end();
        console.log(new Date() - startTime);
        console.log('done seeding detail');
      }
    })
}

// recursiveSeedDetail(0, startCountDetail, maxCountDetail);

// // chain the functions
// seedSize()
//   .then((rowsAdded) => {
//     console.log('seeded sizing data rows:' + rowsAdded);
//     recursiveSeedQuestions(0, 0, 2)
//       .then((done) => {
//         console.log(done);
//       })  
//   })
  