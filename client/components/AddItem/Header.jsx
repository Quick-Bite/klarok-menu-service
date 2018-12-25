import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name, price, close }) => (
  <header>
    <div>
      <button type="button" onClick={close}>Close</button>
      <h3>{name}</h3>
      <h5>{`$${price.toFixed(2)}`}</h5>
    </div>
  </header>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
};

export default Header;
