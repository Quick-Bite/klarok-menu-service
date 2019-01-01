import React from 'react';
import PropTypes from 'prop-types';
import PopularItem from './PopularItem';

const PopularItemsList = ({ mostPopularItems: items, menuListItemClick: handleClick }) => (
  <ul>
    {items.map(item => (
      <li key={item._id}>
        <PopularItem item={item} handleClick={handleClick} />
      </li>
    ))}
  </ul>
);

PopularItemsList.propTypes = {
  mostPopularItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default PopularItemsList;
