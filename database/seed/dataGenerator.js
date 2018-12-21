const faker = require('faker');

const randomFloat = range => range.min + Math.random() * (range.max - range.min);
const randomInt = range => Math.round(randomFloat(range));
const randomIndex = length => Math.floor(Math.random() * length);
const randomArray = (range, callback) => {
  const length = randomInt(range);
  return Array.from({ length }, () => callback());
};

const generateName = () => faker.random.words();
const generateMenuItemCategoriesArray = numCategories => (
  randomArray(numCategories, () => generateName())
);
const generateChoice = range => ({
  name: generateName(),
  price: randomFloat(range),
});
const generateChoicesArray = (numChoices, prices) => (
  randomArray(numChoices, () => generateChoice(prices))
);
const generateRequiredChoiceCategories = (numCategories, numChoices, prices) => (
  randomArray(numCategories, () => ({
    name: generateName(),
    choices: generateChoicesArray(numChoices, prices),
  }))
);

const generateMenuItem = (restaurantId, category, params) => ({
  restaurantId,
  category,
  price: randomFloat(params.priceRange),
  description: faker.lorem.paragraph(),
  pictureUrl: faker.image.food(),
  popular: Math.random() < params.popularFraction,
  spicy: Math.random() < params.spicyFraction,
  requiredChoiceCategories: generateRequiredChoiceCategories(
    params.numRequiredChoiceCategories,
    params.numRequiredChoices,
    params.priceRange,
  ),
  optionalChoices: generateChoicesArray(params.numOptionalChoices, params.priceRange),
});

const generateData = (params) => {
  const data = [];
  for (let restaurantId = 1; restaurantId <= 100; restaurantId += 1) {
    const itemCategories = generateMenuItemCategoriesArray(params.numItemCategories);
    const menuItems = randomArray(params.numMenuItems, () => (
      generateMenuItem(restaurantId, itemCategories[randomIndex(itemCategories.length)], params)
    ));
    data.push(...menuItems);
  }
  return data;
};

module.exports = generateData;
