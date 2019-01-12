const faker = require('faker');

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

const generateItem = ({ itemId, restaurantId }) => {
  const item = {
    itemId,
    restaurantId,
    name: faker.commerce.productName(),
    price: getRandPrice(2, 55),
    pictureUrl: faker.image.food(),
    popular: (getRandInt(0, 10) < 2),
    spicy: (getRandInt(0, 10) < 2),
    category: faker.commerce.productMaterial(),
    description: faker.company.bs(),
    requiredChoiceCategories: [],
    optionalChoices: [],
  };
  item.requiredChoiceCategories = getRandArray(generateChoiceList, 0, 3, item.price);
  item.optionalChoices = getRandArray(generateChoice, 0, 4, item.price);
  const row = `${item.itemId}~${item.restaurantId}~${item.name}~`
    + `${item.price}~${item.pictureUrl}~${item.category}~${item.description}~`
    + `${JSON.stringify(item.requiredChoiceCategories)}~`
    + `${JSON.stringify(item.optionalChoices)}\n`;
  return row;
};

generateItem({itemId: 1, restaurantId: 1});
// console.log('GEN CALL EXPLICIT', generateChoiceList.call(null, [10, 1]));
// console.log('GENCALL', getRandArray(generateChoiceList, 0, 3, 10, 1));
module.exports.item = generateItem;
module.exports.int = getRandInt;
