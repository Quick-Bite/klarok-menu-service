import React from 'react';
import PropTypes from 'prop-types';

const PopularItem = ({ item }) => (
  <div>
    {item.name}
    {item.price}
    {item.pictureUrl}
  </div>
);


PopularItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PopularItem;
