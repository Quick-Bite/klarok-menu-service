const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

app.get('/restaurants/:id/menu-items', (req, res) => {
  const restaurantId = req.params.id;
  db.find({ restaurantId })
    .then((menuItems) => {
      res.send(menuItems);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
