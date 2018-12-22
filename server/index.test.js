/**
 * @jest-environment node
 */
const axios = require('axios');

test('GET request /restaurants/1/menu-items/0 fetchs item details', async () => {
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
