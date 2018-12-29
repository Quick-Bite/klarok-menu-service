import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 768px;
  height: 300px;
  background-image: url(${props => props.pictureUrl});
`;

const Header = ({ name, price, close, pictureUrl }) => (
  <StyledHeader pictureUrl={pictureUrl}>
    <button type="button" onClick={close}>Close</button>
    <h3>{name}</h3>
    <h5>{`$${price.toFixed(2)}`}</h5>
  </StyledHeader>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  pictureUrl: PropTypes.string.isRequired,
};

export default Header;
