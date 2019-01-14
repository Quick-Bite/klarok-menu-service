const faker = require('faker');

const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

const getRandFloat = (start = 0, stop = 1) => {
  return Math.random() * (stop - start) + start;
};

const getRandInt = (start, stop) => {
  return Math.floor(getRandFloat(start, stop));
};

const getRandPrice = (start, stop) => {
  return getRandFloat(start, stop).toFixed(2);
};

const getRandArray = (generator, start, stop, ...args) => {
  const length = getRandInt(start, stop);
  return Array.from({ length }, item => generator.call(null, args));
};

const getRandBool = (probability) => {
  return getRandFloat() < probability;
};

const generateChoice = (maxPrice) => {
  return {
    name: faker.commerce.productMaterial(),
    price: getRandPrice(0, maxPrice),
  };
};

const generateChoiceList = ([maxPrice]) => {
  return {
    name: faker.commerce.product(),
    choices: getRandArray(generateChoice, 2, 4, maxPrice),
  };
};

const generateCategory = () => {
  return faker.commerce.department();
};

const generateCategories = () => {
  return getRandArray(generateCategory, 1, 4);
};

const generateItem = ({ itemId, restaurantId, categories }) => {
  const item = {
    itemId,
    restaurantId,
    name: faker.commerce.productName(),
    price: getRandPrice(2, 55),
    pictureUrl: pictures[faker.random.number(pictures.length - 1)],
    popular: (getRandInt(0, 10) < 2),
    spicy: (getRandInt(0, 10) < 3),
    category: categories[getRandInt(0, categories.length)],
    description: faker.random.words(),
    requiredChoiceCategories: [],
    optionalChoices: [],
  };
  item.requiredChoiceCategories = getRandArray(generateChoiceList, 0, 3, item.price);
  item.optionalChoices = getRandArray(generateChoice, 0, 4, item.price);
  const row = `${item.itemId}~${item.restaurantId}~${item.name}~`
    + `${item.price}~${item.pictureUrl}~`
    + `${item.popular}~${item.spicy}~`
    + `${item.category}~${item.description}~`
    + `${JSON.stringify(item.requiredChoiceCategories)}~`
    + `${JSON.stringify(item.optionalChoices)}\n`;
  return row;
};
console.log(faker.commerce.department());
// console.log(generateItem({ itemId: 1, restaurantId: 1, categories: ['Dessert', 'Appetizers'] }));
// module.exports.item = generateItem;
// module.exports.int = getRandInt;
module.exports = {
  item: generateItem,
  int: getRandInt,
  categories: generateCategories,
};
