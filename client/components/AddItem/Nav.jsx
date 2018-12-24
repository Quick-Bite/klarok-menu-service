import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ name }) => (
  <nav>
    <button type="button">Close</button>
    <h4>{name}</h4>
  </nav>
);

Nav.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Nav;
