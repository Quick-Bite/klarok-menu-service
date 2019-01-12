const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('../database/cassandra.js');
const db = require('../database/postgres.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

app.get('/restaurants/:id/menu-items', async (req, res) => {
  try {
    const menu = await db.getMenu([req.params.id]);
    console.log(menu);
    res.send(menu);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/restaurants/:id/menu-items/:itemId', async (req, res) => {
  try {
    const item = await db.getItem([req.params.id, req.params.itemId]);
    res.send(item);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/restaurants/:id/order', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
