const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '13.57.223.213', // localhost
  port: '3306', // can take out for local 
  user: 'root',
  password: 'root',
  database: 'targetItem'
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting ${err}`);
  } else {
    console.log('db connected');
  }
});

module.exports = connection;
