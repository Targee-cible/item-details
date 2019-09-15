const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('tiff', 'pw123'));
const session = driver.session();

session
  .run("LOAD CSV WITH HEADERS FROM \"file:///Users/TiffanyLee/Desktop/HR/SDC/item-details/db/neo4j/neo4Data/size.csv\" AS Line \
  RETURN Line[0]")
  .then(() => {
    console.log('created');
  })
  .catch((err) => {
    console.log(err);
  });