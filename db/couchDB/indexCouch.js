const nano = require('nano')('http://tiffany:pw123@localhost:5984');

nano.db.create('target')
  .then(() => {
    console.log('target database created');
  })
  .catch(() => console.log('target database already exists'));

// // drop db
// nano.db.destroy('target').then(() => console.log('target database dropped'));



const target = nano.db.use('target');
module.exports = target;

