const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('tiff', 'pw123'));
const session = driver.session();

const maxCountDetail = 5; // reassign for when you want seeding to end
let startCountDetail = 0;
// need 50 cycles of questions => maxCountQuestions = 49
const maxCountQuestions = 5;
let startCountQuestions = 0;
let totalCountDetail = 0;
let totalCountQuestions = 0;
const startTime = new Date();

session
  .run("LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/sizingNeoCSV.csv\" AS LINE CREATE(n:sizing)")
  .then(() => {
    console.log('created sizing added:');
    recursiveSeedQuestions(0, 0, maxCountQuestions);
  })
  .catch((err) => {
    console.log(err);
  });


const seedQuestions = (fileCount) => {
  const path = `LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/detailNeoCSV${fileCount}.csv\" AS LINE CREATE(n:questions)`;
  return session.run(path);
}

const recursiveSeedQuestions = (fileNum, currentTime, end) => {
  seedQuestions(fileNum)
    .then(() => {
      startCountQuestions++;
      totalCountQuestions+= 1000000;
      if (currentTime !== end) {
        recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        console.log('time to complete seed question', new Date() - startTime);
        console.log('done seeding questions');
      }
    })
};