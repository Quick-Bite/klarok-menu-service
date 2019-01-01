const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/menu', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We\'re connected!');
});

const menuItemSchema = new mongoose.Schema({
  restaurantId: Number,
  itemId: Number,
  name: String,
  price: Number,
  description: String,
  category: String,
  pictureUrl: String,
  popular: Boolean,
  spicy: Boolean,
  requiredChoiceCategories: [{
    name: String,
    choices: [{
      name: String,
      price: Number,
    }],
  }],
  optionalChoices: [{
    name: String,
    price: Number,
  }],
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const getAllMenuItems = restaurantId => (
  MenuItem.find({ restaurantId }).select('-requiredChoiceCategories -optionalChoices')
);
const getSingleMenuItem = (restaurantId, itemId) => MenuItem.findOne({ restaurantId, itemId });

module.exports = { getAllMenuItems, getSingleMenuItem, MenuItem };
