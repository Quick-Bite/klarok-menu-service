const Stream = require('stream');
const Promise = require('bluebird');
const generate = require('./generators.js');
const { Client } = require('pg');
var copyFrom = require('pg-copy-streams').from;

const pgClient = new Client({
  user: 'sdc',
  host: 'localhost',
  database: 'sdc',
});

const NUM_CYCLES = 10;
const NUM_SIZE = 100000;

const openInput = (start, stop) => {
  return new Stream.Readable({
    read() {
      let restaurantId = start;
      let batched = '';
      while (restaurantId <= stop) {
        const categories = generate.categories();
        for (let itemId = 0; itemId <= generate.int(5, 15); itemId++) {
          batched += generate.item({ itemId, restaurantId, categories });
          // batched += `${restaurantId}\t${itemId}\n`;
        }
        if (restaurantId % 1000 === 0) { 
          console.log(restaurantId);
        }
        if (restaurantId % 10000 === 0) {
          this.push(batched);
          batched = '';
        }
        restaurantId++;
      }
      // this.push(batched);
      this.push(null);
    },
  });
};

const openPipe = (err, client, done) => {
  // const [start, stop] = [LOOP * SIZE + 1, (LOOP + 1) * SIZE];
  const input = openInput(1, NUM_SIZE);
  // LOOP++;

  const stream = client.query(copyFrom('COPY menu2 FROM STDIN'));

  input.on('error', () => console.log('input error', err));
  stream.on('error', () => console.log('output error', err));
  stream.on('end', () => {
    console.log('output done');
    client.end();
  });
  input.on('end', () => console.log('input closed'));
  input.pipe(stream);
};

pgClient.connect(openPipe);

// const generateDirect = async (count, size) => {
//   for (let i = 0; i < count; i++) {
//     await pgClient.connect(openPipe);
//   }
// };

// generateDirect(5, 1);

// const openOutput = (number) => {
//   if (number % 250 !== 0) {
//     const current = Math.floor(number / 250);
//     return fs.createWriteStream(`./data${current}.csv`, { flags: 'a' });
//   }
//   return fs.createWriteStream(`./data${number / 250}.csv`);
// };

// const openPipe = (loop, size) => {
//   const [start, stop] = [loop * size + 1, (loop + 1) * size];
//   const input = openInput(start, stop);
//   const output = openOutput(loop);
//   input.pipe(output);
//   return new Promise((resolve, reject) => {
//     output.on('finish', () => {
//       resolve(`FINISHED ${start} TO ${stop}`);
//     });
//     output.on('error', reject);
//   });
// };

// async function generateCsv(count, size) {
//   for (let i = 0; i < count; i++) {
//     const response = await openPipe(i, size);
//   }
// }

// generateCsv(1000, 10000);
