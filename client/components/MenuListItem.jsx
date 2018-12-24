import React from 'react';
import PropTypes from 'prop-types';

const MenuListItem = ({ item, menuListItemClick }) => (
  <div onClick={() => menuListItemClick(item.itemId)}>
    <h3>{item.name}</h3>
    <p>{item.price}</p>
    <p>{item.description}</p>
    {item.popular ? <p>Popular</p> : null}
    {item.spicy ? <p>Spicy</p> : null}
    <img src={item.pictureUrl} alt="menu item" />
  </div>
);

MenuListItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    restaurantId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    popular: PropTypes.bool.isRequired,
    spicy: PropTypes.bool.isRequired,
  }).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default MenuListItem;
