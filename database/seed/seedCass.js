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