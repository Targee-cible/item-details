const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting ${err}`);
    return;
  }
  console.log('connected to mysql database');
});
