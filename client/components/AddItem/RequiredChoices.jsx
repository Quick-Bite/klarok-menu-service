import React from 'react';
import PropTypes from 'prop-types';

const RequiredChoices = ({ choiceCategories }) => (
  <div>
    {choiceCategories.map(({ name: category, choices }) => (
      <div>
        <h4>{`Choose a ${category}`}</h4>
        <p>Required - Choose 1.</p>
        {choices.map(({ _id, name, price }) => (
          <label htmlFor={_id}>
            <input type="radio" name={category} id={_id} />
            <span>{`${name} + $${price.toFixed(2)}`}</span>
          </label>
        ))}
      </div>
    ))}
  </div>
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
};

export default RequiredChoices;
