import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ribbon from './Ribbon';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Category = styled.div`
  background-color: rgb(228, 228, 228);
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 20px;
  position: relative;
`;

Category.displayName = 'Category';

const Header = styled.h4`
  margin: 0;
  font-size: 16.5px;
`;

const Info = styled.p`
  margin: 0;
  font-size: 15px;
`;

const ChoicesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
  };
`;

const RadioWrapper = styled.div`
  height: 39px;
  margin: 15px 0;
  display: flex;
`;

const Radio = styled.div`
  min-width: 20px;
  height: 20px;
  margin-right: 5px;
  box-sizing: border-box;
  border: 2px solid #CACACA;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioSelected = styled.div`
  visibility: hidden;
  background-color: rgb(0, 111, 233);
  border-radius: 50%;
  height: 10px;
  width: 10px;
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Label} > ${Radio} {
    border-color: rgb(0, 111, 233);
  }

  &:checked + ${Label} > ${Radio} > ${RadioSelected} {
    visibility: visible;
  }
`;

Input.displayName = 'Input';

const RibbonWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: -30px;
  transform: rotate(90deg);
  width: 35px;
  height: 25px;
  overflow: scroll;
`;

const RibbonInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: -17px;
`;

const RequiredChoices = ({ choiceCategories, updateRequiredChoice }) => (
  <Wrapper>
    {choiceCategories.map(({ name: category, choices }) => (
      <Category key={category}>
        <RibbonWrapper>
          <RibbonInnerWrapper><Ribbon size="35" /></RibbonInnerWrapper>
        </RibbonWrapper>
        <Header>{`Choose a ${category}`}</Header>
        <Info>Required - Choose 1.</Info>
        <ChoicesWrapper>
          {choices.map(({ _id, name, price }) => (
            <RadioWrapper key={_id}>
              <Input
                type="radio"
                name={category}
                id={_id}
                onChange={() => updateRequiredChoice(category, _id, name, price)}
              />
              <Label htmlFor={_id}>
                <Radio>
                  <RadioSelected />
                </Radio>
                <span>{`${name} + $${price.toFixed(2)}`}</span>
              </Label>
            </RadioWrapper>
          ))}
        </ChoicesWrapper>
      </Category>
    ))}
  </Wrapper>
);

RequiredChoices.propTypes = {
  choiceCategories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
  updateRequiredChoice: PropTypes.func.isRequired,
};

export default RequiredChoices;
