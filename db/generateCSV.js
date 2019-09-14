const faker = require('faker');
const fs = require('fs');

// // TO CREATE JSON FOR SIZING
// const generateSizingJSON = function() {
//   const sizingArrayToSeed = [
//     { type: 'Men - Shirts', size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
//     { type: 'Men - Shirts', size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
//     { type: 'Men - Shirts', size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
//     { type: 'Men - Shirts', size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
//     { type: 'Men - Shirts', size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
//     { type: 'Men - Shirts', size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
//     { type: 'Men - Shirts', size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
//   ];
//   return sizingArrayToSeed;
// };

// const convertSizingToCSV = function( JSONobj ) {
//   let str = []; 
//   JSONobj.forEach((rowData) => {
//     const infoArr = [rowData.type, rowData.size, rowData.neck, rowData.chest, rowData.sleeve];
//     str.push(infoArr.join(', '));
//   });
//   return str.join('\n');
// } 

// const sizingCSV = convertSizingToCSV(generateSizingJSON());
// fs.writeFileSync('./db/CSVdata/sizingData.csv', sizingCSV);


// TO CREATE JSON FOR QUESTIONS
// generate questions data
const getRandomItemId = () => faker.random.number({ min: 1, max: 100 });
const checkIfQuestionHasAnswer = function () {
  const hasAnswer = faker.random.number({ min: 0, max: 1 });
  const answerArray = [];
  if (hasAnswer) {
    answerArray.push(faker.lorem.sentence(), faker.name.firstName(), faker.date.past());
    answerArray.push(faker.random.number({ min: 0, max: 5 }), faker.random.number({ min: 0, max: 5 }), faker.random.boolean());
  } else {
    answerArray.push('null', 'null', 'null', 'null', 'null', 'null');
  }
  return answerArray;
};

// generate 200 (will have to adjust this num later) random questions for random itemIds
const generateQuestionJSON = function () {
  const allQs = [];
  for (let index = 0; index < 500000; index += 1) { // adjust the index based on how much data is needed
    const getAnswers = checkIfQuestionHasAnswer();
    const qObj = {
      id: 'null',
      itemId: getRandomItemId(),
      question: faker.lorem.sentence(),
      asker: faker.name.firstName(),
      dateAsked: faker.date.past(),
      answer: getAnswers[0],
      nameOfResponder: getAnswers[1],
      dateAnswered: getAnswers[2],
      helpfulCount: getAnswers[3],
      unhelpfulCount: getAnswers[4],
      teamMember: getAnswers[5],
    };
    allQs.push(qObj);
  }
  return allQs;
};

const convertQuesToCSV = function( JSONobj ) {
  let str = []; 
  JSONobj.forEach((rowData) => {
    const infoArr = Object.keys(rowData).map((key) => rowData[key]);
    str.push(infoArr.join(', '));
  });
  return str.join('\n');
} 

// loop to create multiple files
for (var i = 0; i <= 9; i++) {
  const quesCSV = convertQuesToCSV(generateQuestionJSON());
  fs.writeFileSync(`./db/CSVdata/questionData${i}.csv`, quesCSV);
}




// // TO CREATE JSON FOR ITEM DETAIL
// const randomBulletPoints = function () {
//   const options = faker.random.number({ min: 0, max: 4 });
//   const pointsToList = ['null', 'null', 'null', 'null', 'null'];
//   if (options === 0) {	
//     return pointsToList;	
//   }	
//   let i = 0;	
//   while (i <= options) {	
//     pointsToList[i] = faker.lorem.sentence();	
//     i += 1;	
//   }	
//   return pointsToList;	
// };
//   // loop to add into item detail table, will have to adjust the 100 num
// const generateDetailJSON = function () {
//   let allDetail = [];
//   for (let j = 1; j <= 100000; j += 1) { // adjust for amount of data wanted
//     const pointsToList = randomBulletPoints();
//     const itemObj = {
//       id: 'null',
//       point1: pointsToList[0],
//       point2: pointsToList[1],
//       point3: pointsToList[2],
//       point4: pointsToList[3],
//       point5: pointsToList[4],
//       blurb: faker.lorem.paragraph(),
//       sizing: faker.random.word(),
//       material: faker.commerce.productMaterial(),
//       fit: faker.commerce.productAdjective(),
//       length: faker.random.words(),
//       features: faker.commerce.productAdjective(),
//       neckline: faker.commerce.productAdjective(),
//       itemStyle: faker.commerce.productAdjective(),
//       garmentCuffCutType: faker.random.words(),
//       garmentSleeveStyle: faker.random.words(),
//       careAndCleaning: faker.random.words(),
//       TCIN: faker.random.number(),
//       UPC: faker.random.number(),
//       DPCI: faker.random.number(),
//       origin: faker.random.word(),
//       recycledPolyester: faker.random.boolean(),
//       fastShipping: faker.random.boolean(),
//       estimatedShipDimensions: faker.lorem.sentence(),
//       estimatedShipWeight: faker.random.words(),
//       type: 'Men - Shirts',
//     };

//     allDetail.push(itemObj);
//   }
//   return allDetail;
// };
  
// const convertDetailToCSV = function( JSONobj ) {
//   let str = []; 
//   JSONobj.forEach((rowData) => {
//     const infoArr = Object.keys(rowData).map((key) => rowData[key]);
//     str.push(infoArr.join(', '));
//   });
//   return str.join('\n');
// } 

// for (var i = 0; i <= 9; i++) {
//   const detailCSV = convertDetailToCSV(generateDetailJSON());
//   fs.writeFileSync(`./db/CSVdata/detailData${i}.csv`, detailCSV);
// }
