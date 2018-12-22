const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MenuItem = require('../database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/restaurants/:id', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
