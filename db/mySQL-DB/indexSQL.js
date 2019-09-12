const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'targetItem',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting ${err}`);
  }
  console.log('db connected');
});

module.exports = connection;