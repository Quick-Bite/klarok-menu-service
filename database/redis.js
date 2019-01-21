const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));
const client = redis.createClient();

client.onAsync('connect', () => console.log('REDIS CONNECTED'));

const getFromCache = (key) => {
  return client.getAsync(key)
    .then(result => result)
    .catch(err => console.log('error cache', err));
};

const addToCache = (key, value) => {
  return client.setAsync(key, value)
    .catch(err => err);
};

module.exports = {
  addToCache,
  getFromCache,
  client,
};
