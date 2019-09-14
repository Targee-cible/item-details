const db = require('./indexCouch.js');

const sizingArrayToSeed = [
  { docType: "size", shirtType: 'Men - Shirts', size: 'XS', neck: '13-13.5', chest: '30-32', sleeve: '31.5-32' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'S', neck: '14-14.5', chest: '34-36', sleeve: '32.5-33' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'M', neck: '15-15.5', chest: '38-40', sleeve: '33.5-34' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'L', neck: '16-16.5', chest: '42-44', sleeve: '34.5-35' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'XL', neck: '17-17.5', chest: '46-48', sleeve: '35.5-36' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'XXL', neck: '18-18.5', chest: '50-52', sleeve: '36.5-37' },
  { docType: "size", shirtType: 'Men - Shirts', size: 'XXXL', neck: '19-19.5', chest: '54-56', sleeve: '37.5-38' }
];

db.bulk({docs: sizingArrayToSeed})
  .then((body) => {
    console.log('size added: ', body.length);
  })