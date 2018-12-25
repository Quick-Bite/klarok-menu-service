/**
 * @jest-environment node
 */
const axios = require('axios');

// test('always passes', () => {

// });

test.skip('Fetch data for one menu item', () => {
  expect.assertions(2);
  axios.get('http://localhost:3000/restaurants/1/menu-items/0')
    .then((response) => {
      const menuItem = response.data;
      expect(typeof menuItem).toBe('object');
      expect(menuItem).toMatchObject({
        restaurantId: 1,
        itemId: 0,
        name: 'Baby concept',
      });
    });
});

test.skip('Fetch summary data for all menu items', () => {
  expect.assertions(4);
  axios.get('http://localhost:3000/restaurants/1/menu-items/')
    .then((response) => {
      const menuItems = response.data;
      expect(Array.isArray(menuItems)).toBe(true);
      expect(menuItems.length).toBe(19);
      expect(menuItems[0]).toMatchObject({
        restaurantId: 1,
        itemId: 0,
        name: 'Baby concept',
      });
      expect(menuItems.requiredChoiceCategories).toBe(undefined);
    });
});
