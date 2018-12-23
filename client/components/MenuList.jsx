import React from 'react';
import PropTypes from 'prop-types';

const MenuList = ({ items, categories }) => (
  <div>
    {categories.map(category => (
      <div key={category}>
        <h1>{category}</h1>
        <ul>
          {items
            .filter(item => item.category === category)
            .map(item => <li key={item.itemId}>{item.name}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuList;
