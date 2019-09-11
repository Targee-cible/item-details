const mysql = require('mysql');
const faker = require('faker');
const db = require('./index.SQL.js');

// INSERTING DATA FOR SIZING TABLE
const sizingArrayToSeed = [
  { size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
  { size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
  { size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
  { size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
  { size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
  { size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
  { size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
];

sizingArrayToSeed.forEach((seed) => {
  const sizingQuery = `INSERT INTO sizing (type, size, neck, chest, sleeve) VALUES ('Men - Shirts', ${seed.size}, ${seed.neck}, ${seed.chest}, ${seed.sleeve})`;
  db.query(sizingQuery, (err, res) => {
    if (err) throw err;
    if (res) console.log('seeded sizing data');
  });
});

// INSERTING DATA FOR QUESTIONS
const getRandomItemId = () => faker.random.number({ min: 1, max: 100 });
const checkIfQuestionHasAnswer = function () {
  const hasAnswer = faker.random.number({ min: 0, max: 1 });
  const answerArray = [];

  if (hasAnswer) {
    // for answer info
    answerArray.push(faker.lorem.sentence(), faker.name.firstName(), faker.date.past());
    // for helpful votes info
    answerArray.push(faker.random.number({ min: 0, max: 5 }), faker.random.number({ min: 0, max: 5 }), faker.random.boolean());
  } else {
    answerArray.push(null, null, null, null, null, null);
  }
  return answerArray;
};

// generate 200 (will have to adjust this num later) random questions for random itemIds
for (let index = 1; index <= 200; index += 1) {
  const getAnswers = checkIfQuestionHasAnswer();
  const answerObj = {
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

  // const questionQuery = `INSERT INTO questions (type, size, neck, chest, sleeve) VALUES ('Men - Shirts', ${seed.size}, ${seed.neck}, ${seed.chest}, ${seed.sleeve})`;

  // db.query(sizingQuery, (err, res) => {
  //   if (err) throw err;
  //   if (res) console.log('seeded sizing data');
  // });
};



// INSERTING DATA FOR ITEM-DETAIL
// generate random bullet ponts for item-detail
const randomBulletPoints = function () {
  const options = faker.random.number({ min: 0, max: 4 });
  const pointsToList = [null, null, null, null, null];

  if (options === 0) {
    return pointsToList;
  }

  let i = 0;
  while (i <= options) {
    pointsToList[i] = faker.lorem.sentence();
    i += 1;
  }
  return pointsToList;
};

// loop to add into item detail table, will have to adjust the 100 num
for (let j = 1; j <= 100; j += 1) {
  const pointsToList = randomBulletPoints();
  const itemObj = {
    itemId: j,
    point1: pointsToList[0],
    point2: pointsToList[1],
    point3: pointsToList[2],
    point4: pointsToList[3],
    point5: pointsToList[4],
    blurb: faker.lorem.paragraph(),
    sizing: faker.random.word(),
    material: faker.commerce.productMaterial(),
    fit: faker.commerce.productAdjective(),
    length: faker.random.words(),
    features: faker.commerce.productAdjective(),
    neckline: faker.commerce.productAdjective(),
    itemStyle: faker.commerce.productAdjective(),
    garmentCuffCutType: faker.random.words(),
    garmentSleeveStyle: faker.random.words(),
    careAndCleaning: faker.random.words(),
    TCIN: faker.random.number(),
    UPC: faker.random.number(),
    DPCI: faker.random.number(),
    origin: faker.random.word(),
    recycledPolyester: faker.random.boolean(),
    fastShipping: faker.random.boolean(),
    estimatedShipDimensions: faker.lorem.sentence(),
    estimatedShipWeight: faker.random.words(),
    type: 'Men - Shirts',
  };
  // add into db table for each item
  const detailQuery = `INSERT INTO detail
      (itemId, fitAndSTylePointOne, fitAndSTylePointTwo,
      fitAndSTylePointThree, fitAndSTylePointFour, fitAndSTylePointFive, fitAndSTyleBlurb, sizing, material, fit, length, features, neckline, itemStyle, garmentCuffCutType, garmentSleeveStyle, careAndCleaning, TCIN, UPC, DPCI, origin, recycledPolyester, fastShipping, estimatedShipDimensions, estimatedShipWeight, type)
      values(${itemObj.itemId}, ${itemObj.point1}, ${itemObj.point2}, ${itemObj.point3}, ${itemObj.point4}, ${itemObj.point5}, ${itemObj.blurb}, ${itemObj.sizing}, ${itemObj.material}, ${itemObj.fit}, ${itemObj.length}, ${itemObj.features}, ${itemObj.neckline}, ${itemObj.itemStyle}, ${itemObj.garmentCuffCutType}, ${itemObj.garmentSleeveStyle}, ${itemObj.careAndCleaning}, ${itemObj.TCIN}, ${itemObj.UPC}, ${itemObj.DPCI}, ${itemObj.origin}, ${itemObj.recycledPolyester}, ${itemObj.fastShipping}, ${itemObj.estimatedShipDimensions}, ${itemObj.estimatedShipWeight}, ${itemObj.type})`;

  db.query(detailQuery, (err, res) => {
    if (err) throw err;
    if (res) console.log('seeded detail data');
  });

}
