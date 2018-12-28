import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slider = styled.nav`
  overflow-y: hidden;
  max-height: ${({ scrollTop }) => (scrollTop > 50 ? 'none' : 0)};
  position: fixed;
  top: 0;
`;

const Nav = ({ name, close, scrollTop }) => (
  <Slider scrollTop={scrollTop}>
    <h1>{scrollTop}</h1>
    <button type="button" onClick={close}>Close</button>
    <h4>{name}</h4>
  </Slider>
);

Nav.propTypes = {
  name: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  scrollTop: PropTypes.number.isRequired,
};

export default Nav;
