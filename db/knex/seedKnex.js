var conn = {
  host : '127.0.0.1',
  user : 'root',
  password : '',
};
var knex = require('knex')({
  client: 'mysql',
  connection: conn
});


knex.raw('CREATE DATABASE targetItem')
  .then(function(){
    knex.destroy();
    
    // connect with database selected
    conn.database = 'targetItem';
    knex = require('knex')({ client: 'mysql', connection: conn});

    knex.schema.createTable('sizing', function (table) {
      table.string('type');
      table.string('size');
      table.string('neck');
      table.string('chest');
      table.string('sleeve');
    })
    .then(function() {
      knex.schema.createTable('questions', function (table) {
        table.increments();
        table.integer('itemId');
        table.string('question');
        table.string('asker');
        table.string('dateAsked');
        table.string('nameOfResponder');
        table.string('dateAnswered');
        table.string('helpfulCount');
        table.string('unHelpfulCount');
        table.string('targetTeamMember');
      })
    })
    .then(function() {
      knex.schema.createTable('detail', function (table) {
        table.increments();
        table.integer('itemId');
        table.string('fitAndSTylePointOne');
        table.string('fitAndSTylePointTwo');
        table.string('fitAndSTylePointThree');
        table.string('fitAndSTylePointFour');
        table.string('fitAndSTylePointFive');
        table.string('fitAndSTyleBlurb');
        table.string('sizing');
        table.string('fit');
        table.string('length');
        table.string('features');
        table.string('neckline');
        table.string('itemStyle');
        table.string('garmentCuffCutType');
        table.string('garmentSleeveStyle');
        table.string('careAndCleaning');
        table.integer('TCIN');
        table.integer('UPC');
        table.integer('DPCI');
        table.string('origin');
        table.boolean('recycledPolyester');
        table.boolean('fastShipping');
        table.string('estimatedShipDimensions');
        table.string('estimatedShipWeight');
        table.string('type');
      })
    })
    .then(function() {
      knex.destroy();
    })
  })
  .catch((err) => {
    console.log(err);
    knex.destroy();
  })
  // .then(() => {
  //   knex.raw("select * from sizing");
  // })
  // .then(() => knex.raw("drop database targetItem"))
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));


  module.exports = knex; 


  