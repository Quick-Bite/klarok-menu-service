require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/postgres_pool.js');
const redis = require('../database/redis.js');
// const cluster = require('cluster');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

app.get('/restaurants/:id/menu-items', async (req, res) => {
  // const menu = await db.getMenu([req.params.id]);
  // res.send(menu);
  redis.getFromCache(`/restaurants/${req.params.id}`)
    .then(async (result) => {
      if (result !== null) {
        res.send(JSON.parse(result));
      } else {
        const menu = await db.getMenu([req.params.id]);
        redis.addToCache(`/restaurants/${req.params.id}`, JSON.stringify(menu))
          .catch(err => res.sendStatus(500));
        res.send(menu);
      }
    });
});

app.get('/restaurants/:id/menu-items/:itemId', async (req, res) => {
  // const item = await db.getItem([req.params.id, req.params.itemId]);
  // res.send(item);
  redis.getFromCache(`/restaurants/${req.params.id}/menu-items/${req.params.itemId}`)
    .then(async (result) => {
      if (result !== null) {
        res.send(JSON.parse(result));
      } else {
        const item = await db.getItem([req.params.id, req.params.itemId]);
        redis.addToCache(`/restaurants/${req.params.id}/menu-items/${req.params.itemId}`, JSON.stringify(item))
          .catch(err => res.sendStatus(500));
        res.send(item);
      }
    });
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
    console.log(params);
    await db.postOrder(params);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
