const fs = require('fs');
const { Transform } = require('stream');
const cassandra = require('cassandra-driver');
const readline = require('readline');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'clue',
});


const sample = (req, res) => {
  const query = 'SELECT * FROM menu3 where restaurant_id = 4830';
  client.execute(query)
    .then(result => res.send(result.rows));
};

module.exports.sample = sample;

// const query = 'COPY menu3 (item_id, restaurant_id, name, price, picture_url, category, description, required, optional) FROM \'/Users/kara/Documents/hackreactor/sdc/menu/data.csv\' WITH DELIMITER=\'~\';';

// let queries = [];
// let reader = fs.createReadStream('./data.csv');
// let transformer = new Transform({
//   transform(chunk, encoding, callback) {
    // queries.push({
    //   query: `INSERT INTO menu3 
    //     (item_id, restaurant_id, name, price, picture_url, category, description, required, optional) 
    //     'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //   params: [chunk.toString().split('~')],
    // });
    // console.log(chunk.toString().split('~')[2]);
    // this.push(chunk.toString().split('\n'));
//     console.log(chunk.toString().split('\n'));
//     callback();
//   },
// });

// const rl = readline.createInterface({
//   input: reader,
//   output: transformer,
// });

// reader.pipe(transformer);
// // client.execute(query)
// //   .then(result => console.log(result));
