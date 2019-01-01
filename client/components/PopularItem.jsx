import React from 'react';
import PropTypes from 'prop-types';

const PopularItem = ({ item, handleClick }) => (
  <div onClick={() => handleClick(item.itemId)}>
    {item.name}
    {item.price}
    {item.pictureUrl}
  </div>
);

PopularItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PopularItem;
