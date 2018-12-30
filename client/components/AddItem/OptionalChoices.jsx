import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.h4`
  margin: 0;
`;

const Info = styled.p`
  margin: 0;
  margin-bottom: 20px;
`;

const ChoicesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: flex;
`;

const OptionalChoices = ({ optionalChoices, updateOptionalChoice }) => (
  <div>
    <Header>Would you like extras?</Header>
    <Info>Optional - Choose as many as you like.</Info>
    <ChoicesWrapper>
      {optionalChoices.map(({ _id, name, price }) => (
        <Label key={_id} htmlFor={name}>
          <input
            id={_id}
            type="checkbox"
            name={name}
            onChange={event => updateOptionalChoice(event, _id, name, price)}
          />
          <span>{`Add ${name} + $${price.toFixed(2)}`}</span>
        </Label>
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
