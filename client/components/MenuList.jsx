import React from 'react';
import PropTypes from 'prop-types';

const MenuList = ({ items }) => (
  <ul>
    {items.map(item => <li>{item.name}</li>)}
  </ul>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuList;
