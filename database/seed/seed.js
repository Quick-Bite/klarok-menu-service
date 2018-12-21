const generateData = require('./dataGenerator');

const params = {
  numMenuItems: { max: 50, min: 10 },
  numItemCategories: { max: 3, min: 1 },
  numOptionalChoices: { max: 6, min: 0 },
  numRequiredChoiceCategories: { max: 2, min: 0 },
  numRequiredChoices: { max: 4, min: 2 },
  priceRange: { max: 20, min: 1 },
  popularFraction: 0.2,
  spicyFraction: 0.1,
};

const data = generateData(params);
// TODO - save the generated data into the database
