const knex = require('./seedKnex.js');

var rows = [ { type: 'Men - Shirts', size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' }];
var chunkSize = 30;
knex.batchInsert('sizing', rows, chunkSize)
  .then(() => console.log('seeded'))
  .catch((err) => console.log('error seeding'));
