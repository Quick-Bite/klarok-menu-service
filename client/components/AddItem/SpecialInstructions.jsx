/* eslint react/self-closing-comp: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const SpecialInstructions = ({ handleChange }) => (
  <div>
    <h5>Special instructions</h5>
    <textarea
      placeholder="Dressing on the side? No pickles? Let us know here."
      onChange={handleChange}
    >
    </textarea>
  </div>
);

SpecialInstructions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SpecialInstructions;
