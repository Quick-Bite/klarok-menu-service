const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('../database');
const db = require('../database/postgres.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

app.get('/restaurants/:id/menu-items', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const menuItems = await db.getAllMenuItems(restaurantId);
    console.log('Retrieved from database:');
    console.log(menuItems);
    res.send(menuItems);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/restaurants/:id/menu-items/:itemId', async (req, res) => {
  // const { itemId, id: restaurantId } = req.params;
  // try {
  //   const menuItem = await db.getSingleMenuItem(restaurantId, itemId);
  //   res.send(menuItem);
  // } catch (err) {
  //   console.error(err);
  //   res.sendStatus(500);
  // }
  // db.sample(req, res);
  console.log(db.sample());
});

app.post('/restaurants/:id/order', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
