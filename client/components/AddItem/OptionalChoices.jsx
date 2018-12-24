import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionalChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionalChoices: [],
    };
  }

  render() {
    const { optionalChoices } = this.props;
    return (
      <div>
        <h4>Would you like extras?</h4>
        <p>Optional - Choose as many as you like.</p>
        {optionalChoices.map(({ name, price }) => (
          <label key={name} htmlFor={name}>
            <input type="checkbox" name={name} />
            <span>{`Add ${name} + $${price.toFixed(2)}`}</span>
          </label>
        ))}
      </div>
    );
  }
}

OptionalChoices.propTypes = {
  optionalChoices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default OptionalChoices;
