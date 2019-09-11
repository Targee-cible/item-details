const mongoose = require('mongoose');
const db = mongoose.connection;

// Keeping in comments for future use.
const sizingSchema = new mongoose.Schema({
  size: String,
  neck: String,
  chest: String,
  sleeve: String,
  type: { type: String, default: 'Men - Shirts' },
});

const Sizing = mongoose.model('Sizing', sizingSchema);

const questionSchema = new mongoose.Schema({
  itemId: Number,
  question: String,
  answer: String,
  asker: String,
  dateAsked: Date,
  dateAnswered: Date,
  nameOfResponder: String,
  helpfulCount: Number,
  unhelpfulCount: Number,
  teamMember: Boolean,
});

const Questions = mongoose.model('Questions', questionSchema);

const itemDetailsSchema = new mongoose.Schema({
  itemId: { type: Number, unique: true },
  fitAndStylePointOne: String,
  fitAndStylePointTwo: String,
  fitAndStylePointThree: String,
  fitAndStylePointFour: String,
  fitAndStylePointFive: String,
  fitAndStyleBlurb: String,
  sizing: String,
  material: String,
  fit: String,
  length: String,
  features: String,
  neckline: String,
  itemStyle: String,
  garmentCuffCutType: String,
  garmentSleeveStyle: String,
  careAndCleaning: String,
  TCIN: Number,
  UPC: Number,
  DPCI: Number,
  origin: String,
  recycledPolyester: Boolean,
  fastShipping: Boolean,
  estimatedShipDimensions: String,
  estimatedShipWeight: String,
  type: { type: String, default: 'Men - Shirts' },
});

const ItemDetails = mongoose.model('ItemDetails', itemDetailsSchema);


mongoose.connect('mongodb://localhost/on-target', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database and server are connected!');
  Questions.find({}, (err, res) => {
    if (err) {
      console.log('Error finding data in questions database', err)
    } else {
      ItemDetails.find({itemId:99}, (err, res) => {
        if (err) {
          console.log('Error finding data in item details database', err)
        } else {
          Sizing.find({size: 'XXXL'}, (err, res) => {
            if (err) {
              console.log('Error finding data in sizing database', err)
            } else {
              console.log('seeding script finished!')
              db.close();
            }
          });
        }
      })
    }
  });
});

module.exports.Sizing = Sizing;
module.exports.ItemDetails = ItemDetails;
module.exports.Questions = Questions;
