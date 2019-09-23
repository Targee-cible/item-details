const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'targetItem',
// });
const connection = mysql.createConnection({
  host: '54.183.7.242',
  port: '3306',
  user: 'root',
  password: 'root'
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting ${err}`);
  } else {
    console.log('db connected');
  }
});

module.exports = connection;
