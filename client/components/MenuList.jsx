import React from 'react';
import PropTypes from 'prop-types';
import MenuListItem from './MenuListItem';

const MenuList = ({ items, categories }) => (
  <div>
    {categories.map(category => (
      <div key={category}>
        <h2>{category}</h2>
        <ul>
          {items
            .filter(item => item.category === category)
            .map(item => (
              <li key={item.itemId}>
                <MenuListItem item={item} />
              </li>
            ))}
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
