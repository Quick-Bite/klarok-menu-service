require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/postgres_pool.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

app.get('/restaurants/:id/menu-items', async (req, res) => {
  console.log('HELLO');
  const menu = await db.getMenu([req.params.id]);
  console.log('GOT MENU', menu);
  res.send(menu);
});

app.get('/restaurants/:id/menu-items/:itemId', async (req, res) => {
  const item = await db.getItem([req.params.id, req.params.itemId]);
  res.send(item);
});

app.post('/restaurants/:id/order', async (req, res) => {
  const params = [
    req.params.id,
    1,
    new Date(),
    req.body.totalPrice,
    req.body.item_id,
    req.body.quantity,
    JSON.stringify(req.body.choices),
    req.body.specialInstructions,
  ];
  try {
    await db.postOrder(params);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
