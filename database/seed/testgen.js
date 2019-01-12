const Stream = require('stream');
const fs = require('fs');
const generate = require('./generators.js');

// let restaurantId = 1;

const input = new Stream.Readable({
  read() {
    while (restaurantId < 1001) {
      console.log(restaurantId);
      for (let itemId = 0; itemId <= generate.int(8, 20); itemId++) {
        this.push(generate.item({ itemId, restaurantId }));
      }
      restaurantId++;
    }
  },
});

const openInput = (start, stop) => {
  console.log(start, stop);
  return new Stream.Readable({
    read() {
      let restaurantId = start;
      while (restaurantId <= stop) {
        console.log(restaurantId);
        for (let itemId = 0; itemId <= generate.int(8, 15); itemId++) {
          this.push(generate.item({ itemId, restaurantId }));
        }
        restaurantId++;
      }
      console.log(`FINISHED ${start} TO ${stop}`);
      this.push(null);
    },
  });
};

const openOutput = (number) => {
  return fs.createWriteStream(`./data${number}.csv`);
};

// openInput(1, 10).pipe(openOutput(0));

async function openStream(i) {
  if (i >  5) { return; }
  await openInput(i * 100000 + 1, (i + 1) * 100000).pipe(openOutput(i));
  openStream(i + 1);
};

// async function generateCSV() {
//   for (let i = 0; i < 10; i++) {
//     await openInput(i * 100000 + 1, (i + 1) * 100000).pipe(openOutput(i));
//   }
// }
openStream(0);
// for (let i = 0; i < 2; i++) {
//   console.log(`${i} DOWN`);
//   openInput(i * 1000 + 1, (i + 1) * 1000).pipe(openOutput(i));
// }

// const output = new Stream.Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
// });
const output = fs.createWriteStream('./data.csv', {
  // flags: 'a',
});

// input.pipe(output);

// itemId++;
// console.log(generate.item({ itemId: 1, restaurantId: 1 }));
// const inStream = new Stream.Readable({
//   read(size) {
//     while (restaurantId < 1000000) {
//       console.log(restaurantId);
//       let item = {
//         itemId,
//         restaurantId,
//         name: faker.commerce.productName(),
//         price: faker.commerce.price(),
//         pictureUrl: faker.image.food(),
//         popular: (getRandInt(0, 10) < 2),
//         spicy: (getRandInt(0, 10) < 2),
//         category: faker.commerce.productMaterial(),
//         description: faker.company.bs(),
//       };
//       const row = `${item.id}~${item.restaurantId}~${item.name}~${item.price}~${item.category}~${item.description}\n`;
//       id++;
//       restaurantId++;
//       this.push(row);
//     }
//   },
// });

// const output = new Stream.Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
// });

// const output2 = fs.createWriteStream('./sample.csv');
// inStream.pipe(output2);
