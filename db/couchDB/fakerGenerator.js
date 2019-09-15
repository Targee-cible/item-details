const faker = require('faker');
const fs = require('fs');
const blurbs = {
  para: [],
  sentence: [],
  commerce: [],
  words1: [],
  words2: [],
  words3: [],
};

for (var i = 0; i < 200; i++) {
  const para = faker.lorem.paragraph();
  const sent = faker.lorem.sentence();	
  blurbs.para.push(para);
  blurbs.sentence.push(sent);
  blurbs.commerce.push(faker.commerce.productAdjective())
  blurbs.words1.push(faker.random.words());
  blurbs.words2.push(faker.random.words());
  blurbs.words3.push(faker.random.words());
  // blurbs.name.push(faker.name.firstName());
  // blurbs.datePast.push(faker.date.past());
}



fs.writeFileSync('./db/couchDB/fakerBlurbs.js', JSON.stringify(blurbs, null, '\t'));