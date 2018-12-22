/**
 * @jest-environment node
 */
const axios = require('axios');

test('Fetch data for one menu item', async () => {
  expect.assertions(2);
  const response = await axios.get('http://localhost:3000/restaurants/1/menu-items/0');
  const menuItem = response.data;
  expect(typeof menuItem).toBe('object');
  expect(menuItem).toMatchObject({
    restaurantId: 1,
    itemId: 0,
    name: 'Baby concept',
  });
});

test('Fetch summary data for all menu items', async () => {
  expect.assertions(4);
  const response = await axios.get('http://localhost:3000/restaurants/1/menu-items/');
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
