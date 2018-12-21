// const MenuItem = require('./index');
const faker = require('faker');

// Parameters
const numMenuItems = { max: 50, min: 10 };
const numItemCategories = { max: 3, min: 1 };
const numOptionalChoices = { max: 6, min: 0 };
const numRequiredChoiceCategories = { max: 2, min: 0 };
const numRequiredChoices = { max: 4, min: 2 };
const priceRange = { max: 20, min: 1 };
const popularFraction = 0.2;
const spicyFraction = 0.1;

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
