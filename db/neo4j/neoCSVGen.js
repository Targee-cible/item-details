const faker = require('faker');
const fs = require('fs');
const fakerBlurb = require('../couchDB/fakerBlurbs.js');

// TO CREATE JSON FOR SIZING


// const sizingCSV = `type,size,neck,chest,sleeve\nMen - Shirts, XS, 13-13.5, 30-32, 31.5-32 \nMen - Shirts, S, 14-14.5, 34-36, 32.5-33\nMen - Shirts, M, 15-15.5, 38-40, 33.5-34\nMen - Shirts, L, 16-16.5, 42-44, 34.5-35\nMen - Shirts, XL, 17-17.5, 46-48, 35.5-36\nMen - Shirts, XXL, 18-18.5, 50-52, 36.5-37\nMen - Shirts, XXXL, 19-19.5, 54-56, 37.5-38`;

// fs.writeFileSync(`./db/neo4j/neo4Data/sizingNeoCSV.csv`, sizingCSV);

// // TO CREATE JSON FOR QUESTIONS
// // generate questions data
// const checkIfQuestionHasAnswer = function () {
//   const hasAnswer = Math.floor(Math.random() * Math.floor(2));
//   const answerArray = [];
//   if (hasAnswer) {
//     answerArray.push(fakerBlurb.sentence[Math.floor(Math.random() * Math.floor(201))], faker.name.firstName(), faker.date.past());
//     answerArray.push(Math.floor(Math.random() * Math.floor(6)), Math.floor(Math.random() * Math.floor(6)), faker.random.boolean());
//   } else {
//     answerArray.push('null', 'null', 'null', 'null', 'null', 'null');
//   }
//   return answerArray;
// };

// // generate 200 (will have to adjust this num later) random questions for random itemIds
// const generateQuestionString = function (amtPerBatch) {
//   const getAnswers = checkIfQuestionHasAnswer();
  
//   // data consts 
//   const itemId = Math.floor(Math.random() * Math.floor(101));
//   const question = fakerBlurb.sentence[Math.floor(Math.random() * Math.floor(201))];
//   const asker = faker.name.firstName();
//   const dateAsked = faker.date.past();
//   const answer = getAnswers[0];
//   const nameOfResponder = getAnswers[1];
//   const dateAnswered = getAnswers[2];
//   const helpfulCount = getAnswers[3];
//   const unhelpfulCount = getAnswers[4];
//   const teamMember = getAnswers[5];
  
//   return `${itemId}, ${question}, ${asker}, ${dateAsked}, ${answer}, ${nameOfResponder}, ${dateAnswered}, ${helpfulCount}, ${unhelpfulCount}, ${teamMember}`;

// };

// const generateAllQuestions = function(path, length) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(path, {encoding: 'utf8'});
//     output.write('itemId, question, asker, dateAsked, answer, nameOfResponder, dateAnswered, helpfulCount, unhelpfulCount, teamMember');

//     (async() => {
//       for (var i = 0; i < length; i++) {
//         const obj = generateQuestionString(i);

//         if(!output.write(obj)) {
//           await new Promise(resolve => output.once('drain', resolve));
//         }
//         if (i !== length) {
//           output.write('\n');
//         }
//       }
//       output.end();
//     })();
//     output.on('finish', () => resolve('detal generated'));
//   })
// };

// for (var i = 0; i < 5; i++) {
//   generateAllQuestions(`./db/neo4j/neo4Data/quesNeoCSV${i}.csv`, 1000000);
// }


// TO CREATE JSON FOR ITEM DETAIL
const randomBulletPoints = function () {
  const options = Math.floor(Math.random() * Math.floor(5));
  const pointsToList = ['null', 'null', 'null', 'null', 'null'];
  if (options === 0) {
    return pointsToList;
  }
  let i = 0;
  while (i <= options) {
    pointsToList[i] = fakerBlurb.sentence[Math.floor(Math.random() * Math.floor(201))];
    i += 1;
  }
  return pointsToList;
};



  // loop to add into item detail table, will have to adjust the 100 num
const generateDetailJSON = function (currentNum, cycle) {
  const pointsToList = randomBulletPoints();
  const randomNum = Math.floor(Math.random() * Math.floor(200));
  

  // data constants 
  const itemId = (cycle * 1000000) + currentNum;
  const point1 = pointsToList[0];
  const point2 = pointsToList[1];
  const point3 = pointsToList[2];
  const point4 = pointsToList[3];
  const point5 = pointsToList[4];
  const blurb = fakerBlurb.para[randomNum];
  const sizing = faker.random.word();
  const material = fakerBlurb.commerce[Math.floor(randomNum/2)];
  const fit = fakerBlurb.commerce[Math.floor(randomNum/3)];
  const length = fakerBlurb.words1[Math.floor(randomNum/2)];
  const features = fakerBlurb.commerce[randomNum];
  const neckline = fakerBlurb.commerce[Math.floor(randomNum/2)];
  const itemStyle = fakerBlurb.commerce[Math.floor(randomNum/3)];
  const garmentCuffCutType = fakerBlurb.words1[randomNum];
  const garmentSleeveStyle = fakerBlurb.words2[randomNum];
  const careAndCleaning = fakerBlurb.words3[Math.floor(randomNum/3)];
  const TCIN = faker.random.number();
  const UPC = faker.random.number();
  const DPCI = faker.random.number();
  const origin = fakerBlurb.words3[randomNum];
  const recycledPolyester = faker.random.boolean();
  const fastShipping = faker.random.boolean();
  const estimatedShipDimensions = fakerBlurb.sentence[randomNum];
  const estimatedShipWeight = fakerBlurb.words1[Math.floor(randomNum/3)];
  const type = 'Men - Shirts'
 
  return `${itemId},${point1},${point2},${point3},${point4},${point5},${blurb},${sizing},${material},${fit},${length},${features},${neckline},${itemStyle},${garmentCuffCutType},${garmentSleeveStyle},${careAndCleaning},${TCIN},${UPC},${DPCI},${origin},${recycledPolyester},${fastShipping},${estimatedShipDimensions},${estimatedShipWeight},${type}`;
};



const generateAllDetail = function(path, cycle) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path, {encoding: 'utf8'});
    output.write('itemId, point1, point2, point3, point4, point5, blurb, sizing, material, fit, length, features, neckline, itemStyle, garmentCuffCutType,garmentSleeveStyle,careAndCleaning,TCIN,UPC,DPCI,origin,recycledPolyester,fastShipping,estimatedShipDimensions,estimatedShipWeight,type');

    (async() => {
      for (var i = 0; i < 1000000; i++) {
        const obj = generateDetailJSON(i, cycle, 1000000);

        if(!output.write(obj)) {
          await new Promise(resolve => output.once('drain', resolve));
        }
        if (i !== 1000000) {
          output.write('\n');
        }
      }
      output.end();
    })();
    output.on('finish', () => resolve('detal generated'));
  })
}


for (var i = 0; i < 10; i++) {
  generateAllDetail(`./db/neo4j/neo4Data/detailNeoCSV${i}.csv`, i);
}
