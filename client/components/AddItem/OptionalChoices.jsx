import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.h4`
  margin: 0;
`;

const Info = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-family: 'Nunito Sans', sans-serif;
`;

const ChoicesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  min-width: 20px;
  margin-right: 10px;
  border: 2px solid;
  border-radius: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: white;
`;

const SvgWrapper = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  visibility: hidden;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  font-family: 'Nunito Sans', sans-serif;
`;

const Input = styled.input`
  opacity: 0;
  height: 10px;
  width: 10px;

  &:checked + ${Label} > ${Checkbox} {
    background-color: rgb(0, 111, 233);
    border-width: 0;
  }

  &:focus + ${Label} > ${Checkbox} {
    outline: rgb(59, 153, 252) auto 5px;
  }

  &:checked + ${Label} > ${Checkbox} > ${SvgWrapper} {
    visibility: visible;
  }
`;

const OptionalChoices = ({ optionalChoices, updateOptionalChoice }) => (
  <div>
    <Header>Would you like extras?</Header>
    <Info>Optional - Choose as many as you like.</Info>
    <ChoicesWrapper>
      {optionalChoices.map(({ _id, name, price }) => (
        <CheckboxWrapper key={_id}>
          <Input
            id={_id}
            type="checkbox"
            name={name}
            onChange={event => updateOptionalChoice(event, _id, name, parseFloat(price))}
          />
          <Label htmlFor={_id}>
            <Checkbox>
              <SvgWrapper>
                <svg id="check" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10.04 13.9l8.55-8.55 2.47 2.47-8.55 8.55-2.47 2.48-7.07-7.07 2.48-2.47 4.59 4.59zm0 0" fill="currentColor"></path>
                </svg>
              </SvgWrapper>
            </Checkbox>
            <span>{`Add ${name} + $${price}`}</span>
          </Label>
        </CheckboxWrapper>
      ))}
    </ChoicesWrapper>
  </div>
);

OptionalChoices.propTypes = {
  optionalChoices: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  updateOptionalChoice: PropTypes.func.isRequired,
};

export default OptionalChoices;
