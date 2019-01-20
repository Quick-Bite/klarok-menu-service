const Stream = require('stream');
const Promise = require('bluebird');
const generate = require('./generators.js');
const { Client } = require('pg');
var copyFrom = require('pg-copy-streams').from;

const client = new Client({
  user: 'sdc',
  host: 'localhost',
  database: 'sdc',
});

client.connect(function(err, client, done) {
  var stream = client.query(copyFrom('COPY test FROM STDIN'));
  const input = new Stream.Readable({
    read() {
      let count = 0;
      let batch = '';
      while (count < 5) {
        batch += count + '\t' + count + '\n';
        count++;
      }
      console.log(batch);
      this.push(batch);
      this.push(null);
    }
  });
  input.on('error', () => console.log('input error') );
  stream.on('error', () => console.log('output error'));
  stream.on('end', () => console.log('output done'));
  input.pipe(stream);
});


// const openInput = (start, stop) => {
//   return new Stream.Readable({
//     read() {
//       let restaurantId = start;
//       let batched = '';
//       while (restaurantId <= stop) {
//         const categories = generate.categories();
//         for (let itemId = 0; itemId <= generate.int(5, 15); itemId++) {
//           batched += generate.item({ itemId, restaurantId, categories });
//         }
//         if (restaurantId % 1000 === 0) { 
//           console.log(restaurantId);
//         }
//         restaurantId++;
//       }
//       this.push(batched);
//       this.push(null);
//     },
//   });
// };

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
