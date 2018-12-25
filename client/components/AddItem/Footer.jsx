import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ price, readyToOrder, close }) => (
  <footer>
    <button type="button" disabled={!readyToOrder} onClick={close}>
      {`Add to bag: $${price.toFixed(2)}`}
    </button>
  </footer>
);

Footer.propTypes = {
  price: PropTypes.number.isRequired,
  readyToOrder: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Footer;
