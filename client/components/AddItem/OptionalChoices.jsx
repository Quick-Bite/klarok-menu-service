import React from 'react';
import PropTypes from 'prop-types';

const OptionalChoices = ({ choices, updateChoice }) => (
  <div>
    <h4>Would you like extras?</h4>
    <p>Optional - Choose as many as you like.</p>
    {choices.map(({ _id, name, price }) => (
      <label key={_id} htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          onChange={event => updateChoice(event, _id, name, price)}
        />
        <span>{`Add ${name} + $${price.toFixed(2)}`}</span>
      </label>
    ))}
  </div>
);

OptionalChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  updateChoice: PropTypes.func.isRequired,
};

export default OptionalChoices;
