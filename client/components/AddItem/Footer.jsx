import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  padding: 16px 32px;
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Button = styled.button`
  background-color: rgb(0, 111, 233);
  color: white;
  font-size: 15.4px;
  box-sizing: border-box;
  width: 293px;
  height: 43px;
  border-radius: 4px;
  font-family: 'Muli', sans-serif;
  font-weight: 'Black';
  padding: 8px 16px;
  padding-bottom: 7px;

  &:hover {
    background-color: #004FBF;
  }

  &:disabled {
    background-color: rgb(202, 202, 202);
  }
`;

const Footer = ({ price, readyToOrder, submitOrder }) => (
  <StyledFooter>
    <Button type="button" disabled={!readyToOrder} onClick={submitOrder}>
      {`Add to bag : $${price.toFixed(2)}`}
    </Button>
  </StyledFooter>
);

Footer.propTypes = {
  price: PropTypes.number.isRequired,
  readyToOrder: PropTypes.bool.isRequired,
  submitOrder: PropTypes.func.isRequired,
};

export default Footer;
