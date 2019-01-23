const Stream = require('stream');
const generate = require('./generators.js');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool({
  host: 'localhost',
  database: 'sdc',
  port: 5432,
  max: 5,
});

let NUM_CYCLES = 0;
const NUM_SIZE = 100000;

const openInput = (start, stop) => {
  return new Stream.Readable({
    read() {
      let restaurantId = start;
      let batched = '';
      while (restaurantId <= stop) {
        const categories = generate.categories();
        for (let itemId = 0; itemId <= generate.int(5, 10); itemId++) {
          batched += generate.item({ itemId, restaurantId, categories });
        }
        if (restaurantId % 10000 === 0) {
          console.log(restaurantId);
          this.push(batched);
          batched = '';
        }
        restaurantId++;
      }
      this.push(null);
    },
  });
};

const openPipe = (err, client, release) => {
  const [start, stop] = [NUM_CYCLES * NUM_SIZE + 1, (NUM_CYCLES + 1) * NUM_SIZE];
  NUM_CYCLES++;
  const input = openInput(start, stop);
  const stream = client.query(copyFrom('COPY menu FROM STDIN'));
  input.on('error', () => console.log('input error', err));
  stream.on('error', () => console.log('output error', err));
  stream.on('end', () => {
    client.release();
  });
  input.pipe(stream);
};

const generateDirect = () => {
  for (let i = 0; i < 100; i++) {
    pool.connect(openPipe);
  }
};

generateDirect();
// pool.query('SELECT name FROM menu where restaurant_id = 2', (err, res) => {
//   if (err) throw err;
//   console.log(res);
// });
