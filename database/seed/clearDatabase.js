const { MenuItem } = require('../index');

MenuItem.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  }
  MenuItem.find({}, (err, items) => {
    if (err) {
      return console.error(err);
    }
    return console.log(items);
  });
});
