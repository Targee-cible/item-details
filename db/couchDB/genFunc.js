const faker = require('faker');
const fs = require('fs');
const fakerBlurb = require('./fakerBlurbs.js');

// TO CREATE JSON FOR SIZING
const generateSizingJSON = function() {
  const sizingArrayToSeed = [
    { docType: 'sizing', type: 'Men - Shirts', size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
    { docType: 'sizing', type: 'Men - Shirts', size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
  ];
  return sizingArrayToSeed;
};


// TO CREATE JSON FOR QUESTIONS
// generate questions data
const getRandomItemId = () => Math.floor(Math.random() * Math.floor(101));
const checkIfQuestionHasAnswer = function () {
  const hasAnswer = Math.floor(Math.random() * Math.floor(2));
  const answerArray = [];
  if (hasAnswer) {
    answerArray.push(fakerBlurb.sentence[Math.floor(Math.random() * Math.floor(201))], faker.name.firstName(), faker.date.past());
    answerArray.push(Math.floor(Math.random() * Math.floor(6)), Math.floor(Math.random() * Math.floor(6)), faker.random.boolean());
  } else {
    answerArray.push('null', 'null', 'null', 'null', 'null', 'null');
  }
  return answerArray;
};

// generate 200 (will have to adjust this num later) random questions for random itemIds
const generateQuestionJSON = function (amtPerBatch) {
  const allQs = [];
  for (let index = 0; index < amtPerBatch; index += 1) { // adjust the index based on how much data is needed
    const getAnswers = checkIfQuestionHasAnswer();
    const qObj = {
      docType: 'question',
      itemId: getRandomItemId(),
      question: fakerBlurb.sentence[Math.floor(Math.random() * Math.floor(201))],
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
const generateDetailJSON = function (amtPerBatch, currentCount) {
  let allDetail = [];
  for (let j = 1; j <= amtPerBatch; j += 1) { // adjust for amount of data wanted
    const pointsToList = randomBulletPoints();
    const randomNum = Math.floor(Math.random() * Math.floor(200));
    const itemObj = {
      docType: 'detail',
      itemId: currentCount+j,
      point1: pointsToList[0],
      point2: pointsToList[1],
      point3: pointsToList[2],
      point4: pointsToList[3],
      point5: pointsToList[4],
      blurb: fakerBlurb.para[randomNum],
      sizing: faker.random.word(),
      material: fakerBlurb.commerce[Math.floor(randomNum/2)],
      fit: fakerBlurb.commerce[Math.floor(randomNum/3)],
      length: fakerBlurb.words1[Math.floor(randomNum/2)],
      features: fakerBlurb.commerce[randomNum],
      neckline: fakerBlurb.commerce[Math.floor(randomNum/2)],
      itemStyle: fakerBlurb.commerce[Math.floor(randomNum/3)],
      garmentCuffCutType: fakerBlurb.words1[randomNum],
      garmentSleeveStyle: fakerBlurb.words2[randomNum],
      careAndCleaning: fakerBlurb.words3[Math.floor(randomNum/3)],
      TCIN: faker.random.number(),
      UPC: faker.random.number(),
      DPCI: faker.random.number(),
      origin: fakerBlurb.words3[randomNum],
      recycledPolyester: faker.random.boolean(),
      fastShipping: faker.random.boolean(),
      estimatedShipDimensions: fakerBlurb.sentence[randomNum],
      estimatedShipWeight: fakerBlurb.words1[Math.floor(randomNum/3)],
      type: 'Men - Shirts',
    };

    allDetail.push(itemObj);
  }
  return allDetail;
};



module.exports = {
  generateSizingJSON, 
  generateQuestionJSON,
  generateDetailJSON
}