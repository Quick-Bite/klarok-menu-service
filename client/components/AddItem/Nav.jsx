import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Times } from 'styled-icons/fa-solid';

const BlueTimes = styled(Times)`
  color: rgb(0, 111, 233);

  &:hover {
    color: #004FBF;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    visibility: visible;
  }

  to {
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
    visibility: hidden;
  }
`;

const slide = ({ scrollTop, SHOW_Y }) => (
  (scrollTop > SHOW_Y)
    ? slideDown
    : slideUp
);

const Slider = styled.nav`
  overflow-y: hidden;
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  animation: ${slide} 300ms forwards;
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

const Nav = ({ name, close, scrollTop, SHOW_Y }) => (
  <Slider scrollTop={scrollTop} SHOW_Y={SHOW_Y}>
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
  SHOW_Y: PropTypes.number.isRequired,
};

export default Nav;
