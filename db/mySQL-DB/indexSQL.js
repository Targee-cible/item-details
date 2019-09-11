const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'target',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting ${err}`);
  }
  console.log('db connected');
  // create items detail table
  const details = `create table if not exists detail (
                    itemId int primary key auto_increment,
                    fitAndSTylePointOne varchar(255),
                    fitAndSTylePointTwo varchar(255),
                    fitAndSTylePointThree varchar(255),
                    fitAndSTylePointFour varchar(255),
                    fitAndSTylePointFive varchar(255),
                    fitAndSTyleBlurb varchar(255),
                    sizing varchar(255),
                    material varchar(255),
                    fit varchar(255),
                    length varchar(255),
                    features varchar(255),
                    neckline varchar(255),
                    itemStyle varchar(255),
                    garmentCuffCutType varchar(255),
                    garmentSleeveStyle varchar(255),
                    careAndCleaning varchar(255),
                    TCIN int,
                    UPC int,
                    DPCI int,
                    origin varchar(255),
                    recycledPolyester TINYINT,
                    fastShipping TINYINT,
                    estimatedShipDimensions varchar(255),
                    estimatedShipWeight varchar(255),
                    type varchar(255)
                )`;

  connection.query(details, (err, result) => {
    if (err) throw err;
    console.log('item-detail table created');
  });

  // create questions table
  const questions = `create table if not exists questions (
                        itemId int primary key auto_increment,
                        question varchar(255),
                        asker varchar(255),
                        dateAsked date,
                        answer varchar(255),
                        nameOfResponder varchar(255),
                        dateAnswered date,
                        helpfulCount int,
                        unHelpfulCount int,
                        targetTeamMember TINYINT
                    )`;

  connection.query(questions, (err, result) => {
    if (err) throw err;
    console.log('questions table created');
  });

  // create sizing table
  const sizing = `create table if not exists sizing (
                      type varchar(255),
                      size varchar(255),
                      neck varchar(255),
                      chest varchar(255),
                      sleeve varchar(255)
                  )`;

  connection.query(sizing, (err, result) => {
    if (err) throw err;
    console.log('sizing table created');
  });
});

module.exports = connection;
