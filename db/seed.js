const faker = require('faker');

//Below is for the Sizing collection. This clears the existing seeded database so it starts with a clean slate.
Sizing.remove({}, (err) => {
  if (err) {
    console.log('Error removing items from sizing database', err);
  }
});

//The information for the sizing schema is static, so we'll input it directly.
const sizingArrayToSeed = [
  { size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
  { size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
  { size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
  { size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
  { size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
  { size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
  { size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
];

// Here's where we do the insert.
Sizing.insertMany(sizingArrayToSeed, (err, results) => {
  if (err) {
    console.log('There has been an error inserting into sizing.', err)
  }
});

// Below is for the Item Details model specifically.
// This clears the existing seeded database from the Item Details model.
ItemDetails.remove({}, (err) => {
  if (err) {
    console.log('Error removing items', err);
  }
});

// Not all of the items will include 5 bullet points, but I want to be able to
// accommodate up to 5. So, the below function adds that randomness into my model.
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

// Below, I generate an array with data from Faker so that
// I have 100 random records to insert into my model.
const arrayToSeed = [];

for (let j = 1; j <= 100; j += 1) {
  const pointsToList = randomBulletPoints();

  arrayToSeed.push(new ItemDetails({
    itemId: j,
    fitAndStylePointOne: pointsToList[0],
    fitAndStylePointTwo: pointsToList[1],
    fitAndStylePointThree: pointsToList[2],
    fitAndStylePointFour: pointsToList[3],
    fitAndStylePointFive: pointsToList[4],
    fitAndStyleBlurb: faker.lorem.paragraph(),
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
  }));
}

// Here is where I insert the randomly generated array.
ItemDetails.insertMany(arrayToSeed, (err) => {
  if (err) {
    console.log('There has been an error!', err);
  }
});


// Next, I want to seed my Questions model.
// First, I'll remove whatever is there.
Questions.remove({}, (err) => {
  if (err) {
    console.log('Error removing items', err);
  }
});

// I need to generate a random ID between 1-100 so that they
// match one of the item numbers, so I'll do that below.
const getRandomItemId = () => faker.random.number({ min: 1, max: 100 });

// Some questions won't yet have answers, and I will need to account for that.
// In cases they don't, I'll factor that in to the other fields that depend on an
// answer, and push null to those fields.

const checkIfQuestionHasAnswer = function () {
  const hasAnswer = faker.random.number({ min: 0, max: 1 });
  const answerArray = [];

  if (hasAnswer) {
    answerArray.push(faker.lorem.sentence(), faker.name.firstName(), faker.date.past());
    answerArray.push(faker.random.number({min: 0, max: 5}), faker.random.number({min: 0, max: 5}), faker.random.boolean());
  } else {
    answerArray.push(null, null, null, null, null, null);
  }
  return answerArray;
};

// Now, I'll generate 200 random questions/answers to store in my Questions
const questionsToSeed = [];

for (let index = 1; index <= 200; index += 1) {
  const getAnswers = checkIfQuestionHasAnswer();

  questionsToSeed.push(new Questions({
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
  }));
};

// Here, I'll insert them into the model.
Questions.insertMany(questionsToSeed, (err) => {
  if (err) {
    console.log('There has been an error uploading questions!', err);
  }
});
