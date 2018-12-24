import React from 'react';
import PropTypes from 'prop-types';

class QuantityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  handleChange(event) {
    const inputElement = event.target;
    const quantity = Math.trunc(Number(inputElement.value));
    inputElement.value = quantity;
    this.setState({ quantity });

    const { updateQuantity } = this.props;
    updateQuantity(quantity);
  }

  incrementQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });

    const { updateQuantity } = this.props;
    updateQuantity(quantity + 1);
  }

  decrementQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity - 1 });

    const { updateQuantity } = this.props;
    updateQuantity(quantity - 1);
  }

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <h5>Quantity</h5>
        <div>
          <button
            className="decrement"
            type="button"
            onClick={this.decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input value={quantity} type="number" onChange={this.handleChange} />
          <button
            className="increment"
            type="button"
            onClick={this.incrementQuantity}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

QuantityPicker.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
};

export default QuantityPicker;
