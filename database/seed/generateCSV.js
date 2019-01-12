const Stream = require('stream');
const Promise = require('bluebird');
const fs = require('fs');
const generate = require('./generators.js');

const openInput = (start, stop) => {
  // console.log(start, stop);
  return new Stream.Readable({
    read() {
      let restaurantId = start;
      let batched = '';
      while (restaurantId <= stop) {
        for (let itemId = 0; itemId <= generate.int(8, 15); itemId++) {
          batched += generate.item({ itemId, restaurantId });
        }
        if (restaurantId % 1000 === 0) { 
          console.log(restaurantId); 
          this.push(batched);
          batched = '';
        }
        restaurantId++;
      }
      // console.log(`FINISHED ${start} TO ${stop}`);
      this.push(null);
    },
  });
};

const openOutput = (number) => {
  // if (number % 100 !== 0) { //If not multiple of 100, append to current file
  //   const current = Math.floor(number / 100);
  //   return fs.createWriteStream(`./dataS${current}.csv`, { flags: 'a' });
  // }
  // return fs.createWriteStream(`./dataS${number / 100}.csv`);
  return fs.createWriteStream(`./dataS.csv`);
};

const openPipe = (i, size) => {
  const [start, stop] = [i * size + 1, (i + 1) * size];
  const input = openInput(start, stop);
  const output = openOutput(i);
  input.pipe(output);
  return new Promise((resolve, reject) => {
    output.on('finish', () => {
      resolve(`FINISHED ${start} TO ${stop}`);
    });
    output.on('error', reject);
  });
};

async function generateCsv(count, size) {
  for (let i = 0; i < count; i++) {
    const response = await openPipe(i, size);
    // console.log('RESULTS FROM PIPE', response);
  }
}

generateCsv(20, 10000);
