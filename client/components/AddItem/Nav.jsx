import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid';

const SHOW_AT = 50;

const BlueTimes = styled(Times)`
  color: rgb(0, 111, 233);

  &:hover {
    color: #004FBF;
  }
`;

const Slider = styled.nav`
  overflow-y: hidden;
  max-height: ${({ scrollTop }) => (scrollTop > SHOW_AT ? 'none' : 0)};
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  box-shadow: ${({ scrollTop }) => (
    (scrollTop > SHOW_AT)
      ? '0 2px 10px 0 rgba(0, 0, 0, 0.1)'
      : 'unset'
  )};
`;

const CloseButton = styled.button`
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
`;

const Name = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  padding: 12px 0;
`;

const Nav = ({ name, close, scrollTop }) => (
  <Slider scrollTop={scrollTop}>
    <CloseButton type="button" onClick={close}>
      <BlueTimes size="24" />
    </CloseButton>
    <Name>{name}</Name>
  </Slider>
);

Nav.propTypes = {
  name: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  scrollTop: PropTypes.number.isRequired,
};

export default Nav;
