const faker = require('faker');
const fs = require('fs');
const fakerBlurb = require('./fakerBlurbs.js');

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
  let allDetail = [];
  for (let j = 1; j <= currentNum; j += 1) { // adjust for amount of data wanted
    const pointsToList = randomBulletPoints();
    const randomNum = Math.floor(Math.random() * Math.floor(200));
    const itemObj = {
      docType: 'detail',
      itemId: currentNum,
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

const generateAll = function(path, length) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path, {encoding: 'utf8'});
    output.write('module.exports = [');

    (async() => {
      for (var i = 0; i < length; i++) {
        const obj = JSON.stringify(generateDetailJSON(1, 0));

        if(!output.write(obj)) {
          await new Promise(resolve => output.once('drain', resolve));
        }
        if (i !== length) {
          output.write(',');
        }
      }
      output.write(']');
      output.end();
    })();
    output.on('finish', () => resolve('detal generated'));
  })
}



// const detailJSON = generateDetailJSON(1000000, 0);
// fs.writeFileSync('./db/JSONdata/detailData.js', JSON.stringify(detailJSON, null, '\t'));

generateAll('./db/detailJSON.js', 1000000);