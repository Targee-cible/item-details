const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'pw123'));
const session = driver.session();

const maxDetailCycle = 99;
const maxQuestionCycle = 19;
let totalCountDetail = 0;
let totalCountQuestions = 0;
const startTime = new Date();

session
  .run("LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/sizingNeoCSV.csv\" AS LINE CREATE(n:sizing { type: LINE.type, size: LINE.size, neck: LINE.neck, chest: LINE.chest, sleeve: LINE.sleeve})")
  .then(() => {
    console.log('created sizing');
    recursiveSeedQuestions(0, 0, maxQuestionCycle);
  })
  .catch((err) => {
    console.log(err);
  });


const seedQuestions = (fileCount) => {
  const path = `USING PERIODIC COMMIT 500 LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/quesNeoCSV${fileCount}.csv\" AS line CREATE(n:questions {id: line.id, itemId: line.itemId, question:line.question, dateAsked: line.dateAsked, answer: line.answer, nameOfResponder: line.nameOfResponder, dateAnswered: line.dataAnswered, helpfulCount: line.helpfulCount, unhelpfulCount: line.unhelpfulCount, teamMember: line.teamMember})`;
  return session.run(path);
}

const recursiveSeedQuestions = (fileNum, currentTime, end) => {
  // if (fileNum >= 20) {
  //   fileNum = fileNum.toString().split('').pop();
  // }
  seedQuestions(fileNum)
    .then(() => {
      totalCountQuestions+= 100000;
      if (currentTime !== end) {
        recursiveSeedQuestions(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        driver.close();
        console.log('time to complete seed question', new Date() - startTime);
        recursiveSeedDetail(0, 0, maxDetailCycle);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedDetail = (fileCount) => {
  const path = `USING PERIODIC COMMIT 250 LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/detailNeoCSV${fileCount}.csv\" AS line CREATE(n:detail {itemId:line.itemId, point1:line.point1, point2:line.point2, point3:line.point3, point4: line.point4, point5: line.point5, blurb: line.blurb, sizing: line.sizing, material: line.material, fit: line.fit, length: line.length, features: line.features, neckline: line.neckline, itemStyle: line.itemStyle, garmentCuffCutType: line.garmentCuffCutType, garmentSleeveStyle: line.garmentSleeveStyle, careAndCleaning: line.careAndCleaning, TCIN: line.TCIN, UPC: line.UPC, DPCI: line.DPCI, origin: line.origin, recycledPolyester: line.recycledPolyester, fastShipping: line.fastShipping, estimatedShipDimensions: line.estimatedShipDimensions, estimatedShipWeight: line.estimatedShipWeight, type: line.type })`;
  return session.run(path);
};

const recursiveSeedDetail = (fileNum, currentTime, end) => {
  seedDetail(fileNum)
    .then(() => {
      totalCountDetail+= 100000;
      if (currentTime !== end) {
        recursiveSeedDetail(fileNum + 1, currentTime + 1, end);
      }
      if (currentTime === end) {
        driver.close();
        console.log('time to complete all seeding', new Date() - startTime);
        console.log('total questions added', totalCountQuestions);
        console.log('total detail added', totalCountDetail);
      }
    });
};

// recursiveSeedDetail(0, 0, maxDetailCycle);