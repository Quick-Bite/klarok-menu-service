
CREATE TABLE menu2 (
  item_id INTEGER,
  restaurant_id INTEGER,
  name VARCHAR(40),
  price FLOAT,
  picture_url VARCHAR(200),
  popular BOOLEAN,
  spicy BOOLEAN,
  category VARCHAR(40),
  description VARCHAR(300),
  required JSON,
  optional JSON,
  PRIMARY KEY (restaurant_id, item_id)
);

CREATE INDEX restaurant_idx2 ON menu2 (restaurant_id);