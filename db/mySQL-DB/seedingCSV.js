const mysql = require('mysql');
const faker = require('faker');
const db = require('./indexSQL.js');

// need 99 cyles of detail => maxCountDetail = 99
const maxCountDetail = 99; // reassign for when you want seeding to end
let startCountDetail = 0;
// need 50 cycles of questions => maxCountQuestions = 49
const maxCountQuestions = 40;
let startCountQuestions = 0;
let totalCountDetail = 0;
let totalCountQuestions = 0;
const startTime = new Date();

// INSERTING DATA FOR SIZING TABLE
const seedSize = () => {
  const sizingQuery = `LOAD DATA LOCAL INFILE './db/neo4j/neo4Data/sizingNeoCSV.csv'
    INTO TABLE sizing FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS` ;
  return new Promise((resolve, reject) => {
    db.query(sizingQuery, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res.affectedRows);
    });
  })
};


// INSERTING DATA FOR QUESTIONS
const seedQuestions = (fileCount) => {
  if (fileCount >= 20) {
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
      startCountQuestions++;
      totalCountQuestions+= rows;
      if (currentTime !== end) {
        recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        console.log('time to complete seed question', new Date() - startTime);
        console.log('done seeding questions');
        recursiveSeedDetail(0, startCountDetail, maxCountDetail);
      }
    })
};

// INSERTING DATA FOR ITEM-DETAIL
const seedDetail = (fileCount) => {
  // if (fileCount >= 10) {
  //   fileCount = fileCount.toString().split('').pop();
  // }
  const path = `./db/neo4j/neo4Data/detailNeoCSV${fileCount}.csv`
  const questionQuery = `LOAD DATA LOCAL INFILE ?
  INTO TABLE detail FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS` ;
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
      totalCountDetail+= rows;
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        db.end();
        console.log('time to complete all seeding', new Date() - startTime);
        console.log('done seeding detail');
        console.log('total questions added', totalCountQuestions);
        console.log('total detail added', totalCountDetail);
      }
    })
}


// chain the functions
seedSize()
  .then((rowsAdded) => {
    console.log('size seeding completed data. added rows:' + rowsAdded);
    recursiveSeedQuestions(0, 0, maxCountQuestions);
  })
