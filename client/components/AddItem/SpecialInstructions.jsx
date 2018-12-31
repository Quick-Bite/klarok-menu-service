import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.h5`
  margin: 0;
  margin-bottom: 4px;
  font-size: 16.5px;
`;

const TextArea = styled.textarea`
  height: 76px;
  width: 100%;
  padding: 16px;
  border: 2px solid #CACACA;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  font-family: 'Nunito Sans', sans-serif;
`;

const SpecialInstructions = ({ handleChange }) => (
  <Wrapper>
    <Header>Special instructions</Header>
    <TextArea
      placeholder="Dressing on the side? No pickles? Let us know here."
      onChange={handleChange}
    >
    </TextArea>
  </Wrapper>
);

SpecialInstructions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SpecialInstructions;
