const faker = require('faker');
const generateSizingJSON = function() {
  const sizingArrayToSeed = [
    { type: 'Men - Shirts', size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
    { type: 'Men - Shirts', size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
    { type: 'Men - Shirts', size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
    { type: 'Men - Shirts', size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
    { type: 'Men - Shirts', size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
    { type: 'Men - Shirts', size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
    { type: 'Men - Shirts', size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
  ];
  return sizingArrayToSeed;
};


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
    answerArray.push(null, null, null, null, null, null);
  }
  return answerArray;
};

// generate 200 (will have to adjust this num later) random questions for random itemIds
const generateQuestionJSON = function () {
  const allQs = [];
  for (let index = 1; index <= 10; index += 1) { // adjust the index based on how much data is needed
    const getAnswers = checkIfQuestionHasAnswer();
    const qObj = {
      docType: "question",
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
    // const questArr = Object.keys(qObj).map((key) => qObj[key]);
    allQs.push(qObj);
  }
  return allQs;
};



module.exports = {
  generateSizingJSON, 
  generateQuestionJSON
}