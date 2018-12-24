import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name, price }) => (
  <header>
    <div>
      <h3>{name}</h3>
      <h5>{price}</h5>
    </div>
  </header>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Header;
