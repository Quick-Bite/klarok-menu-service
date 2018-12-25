import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ name, close }) => (
  <nav>
    <button type="button" onClick={close}>Close</button>
    <h4>{name}</h4>
  </nav>
);

Nav.propTypes = {
  name: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Nav;
