import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BlueTimes from './BlueTimes';

const StyledHeader = styled.header`
  width: 768px;
  height: 300px;
  background-image: url(${props => props.pictureUrl});
  position: relative;
`;

const NamePriceBox = styled.div`
  position: absolute;
  bottom: 40px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 23px;
`;

const Price = styled.h5`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 17px;
  left: 20px;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Header = ({ name, price, close, pictureUrl }) => (
  <StyledHeader pictureUrl={pictureUrl}>
    <CloseButton type="button" onClick={close}>
      <BlueTimes size="24" />
    </CloseButton>
    <NamePriceBox>
      <Name>{name}</Name>
      <Price>{`$${price.toFixed(2)}`}</Price>
    </NamePriceBox>
  </StyledHeader>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  pictureUrl: PropTypes.string.isRequired,
};

export default Header;
