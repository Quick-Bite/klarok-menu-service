import React from 'react';
import PropTypes from 'prop-types';
import PopularItem from './PopularItem';

const PopularItemsList = ({ mostPopularItems: items }) => (
  <ul>
    {items.map(item => (
      <li key={item._id}>
        <PopularItem item={item} />
      </li>
    ))}
  </ul>
);

PopularItemsList.propTypes = {
  mostPopularItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PopularItemsList;
