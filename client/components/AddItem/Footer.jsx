import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ price }) => (
  <footer>
    <button type="button">{`Add to bag: $${price.toFixed(2)}`}</button>
  </footer>
);

Footer.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Footer;
