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
    const { optionalChoices, updateOptionalChoice } = this.props;
    return (
      <div>
        <h4>Would you like extras?</h4>
        <p>Optional - Choose as many as you like.</p>
        {optionalChoices.map(({ _id, name, price }) => (
          <label key={_id} htmlFor={name}>
            <input
              type="checkbox"
              name={name}
              onChange={event => updateOptionalChoice(event, _id, name, price)}
            />
            <span>{`Add ${name} + $${price.toFixed(2)}`}</span>
          </label>
        ))}
      </div>
    );
  }
}

OptionalChoices.propTypes = {
  optionalChoices: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  updateOptionalChoice: PropTypes.func.isRequired,
};

export default OptionalChoices;
