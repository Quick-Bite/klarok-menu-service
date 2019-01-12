# Project Name

Clone of Grubhub.com restaurant page. This is the module for the menu list and menu item modal.

## Related Projects

  - https://github.com/HRSF108-Group7/FEC-profile
  - https://github.com/HRSF108-Group7/FEC-menu
  - https://github.com/HRSF108-Group7/FEC-suggestion
  - https://github.com/HRSF108-Group7/FEC-Ammar-Project

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

This is one of the four services listed above. They all need to be run together in a proxy server.

Run `npm run seedDb` to seed the database.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

Cassandra CRUD API
------

Create/POST
------
'/restaurants/:id/order'
```
INSERT INTO orders (name, item_id, restaurant_id, choices, quantity, special, total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
```

'/restaurants/:id/menu-items'
```
INSERT INTO menu3 (
    restaurant_id, item_id, name, 
    price, picture_url, category, 
    description, required, optional
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
```

Read/GET
------
'/restaurants/:id/menu-items'
```
SELECT * FROM menu WHERE restaurant_id = ?
```
'/restaurants/:id/menu-items/:itemId'
```
SELECT * FROM menu WHERE restaurant_id = ? AND item_id = ?
```

Update/PUT
------
'/restaurants/:id/menu-items/:itemId'
```
UPDATE menu SET (
    name, price, picture_url, category, 
    description, required, optional
) WHERE restaurant_id = ? AND item_id = ?
```

Delete/DELETE
------
'/restaurants/:id/menu-items/:itemId'
```
DELETE FROM menu WHERE restaurant_id = ? AND item_id = ?
```

PostgreSQL CRUD API
=
___

Create/POST
-
'/restaurants/:id/order'
  ```
  INSERT INTO orders (
    name, item_id, restaurant_id, 
    choices, quantity, special, total
  ) VALUES ($, $, $, $, $, $, $);
  ```
  
'/restaurants/:id/menu-items'
  ```
  INSERT INTO menu (
    item_id, restaurant_id, name, 
    price, picture_url, category, 
    description, required, optional
  ) VALUES ($, $, $, $, $, $, $, $, $);
  ``` 

Read/GET
-
'/restaurants/:id/menu-items'
  ```
  SELECT * FROM menu WHERE restaurant_id = $;
  ```

'/restaurants/:id/menu-items/:itemId'
  ```
  SELECT * FROM menu 
    WHERE restaurant_id = $ AND item_id = $;
  ```
  
Update/PUT
-
'/restaurants/:id/menu-items/:itemId'
  ```
    UPDATE menu SET 
      name = $1,
      price = $2,
      picture_url = $3,
      category = $4,
      description = $5,
      required = $6,
      optional $7
    WHERE restaurant_id = $ AND item_id = $;
  ```
  
Delete/DELETE
-
'/restaurants/:id/menu-items/:itemId'
  ```
  DELETE FROM menu WHERE restaurant_id = $ AND item_id = $;
  ```
