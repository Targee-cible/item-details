const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('tiff', 'pw123'));
const session = driver.session();

const maxDetailCycle = 2;
const maxQuestionCycle = 4;
let totalCountDetail = 0;
let totalCountQuestions = 0;
const startTime = new Date();

// session
//   .run("LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/sizingNeoCSV.csv\" AS LINE CREATE(n:sizing)")
//   .then(() => {
//     console.log('created sizing added:');
//     recursiveSeedQuestions(0, 0, maxCountQuestions);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// const seedQuestions = (fileCount) => {
//   const path = `LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/QuesNeoCSV${fileCount}.csv\" AS LINE CREATE(n:questions)`;
//   return session.run(path);
// }

// const recursiveSeedQuestions = (fileNum, currentTime, end) => {
//   seedQuestions(fileNum)
//     .then(() => {
//       totalCountQuestions+= 1000000;
//       if (currentTime !== end) {
//         recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
//       }
//       if (currentTime === end) {
//         console.log('time to complete seed question', new Date() - startTime);
//         console.log('done seeding questions');
//         recursiveSeedDetail(0, 0, maxQuestions);
//       }
//     })
// };

const seedDetail = (fileCount) => {
  const path = `LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/detailNeoCSV${fileCount}.csv\" AS LINE CREATE(n:detail)`;
  return session.run(path);
}

const recursiveSeedDetail = (fileNum, currentTime, end) => {
  seedDetail(fileNum)
    .then(() => {
      totalCountDetail+= 1000000;
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        driver.close();
        console.log('time to complete all seeding', new Date() - startTime);
        console.log('done seeding detail');
        console.log('total questions added', totalCountQuestions);
        console.log('total detail added', totalCountDetail);
      }
    })
};

recursiveSeedDetail(0, 0, maxDetailCycle);