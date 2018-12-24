import React from 'react';

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
    const quantity = Number(inputElement.value);
    inputElement.value = quantity;
    this.setState({ quantity });
  }

  incrementQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  }

  decrementQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity - 1 });
  }

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <h5>Quantity</h5>
        <div>
          <button type="button" onClick={this.decrementQuantity} disabled={quantity <= 1}>-</button>
          <input value={quantity} type="number" onChange={this.handleChange} />
          <button type="button" onClick={this.incrementQuantity}>+</button>
        </div>
      </div>
    );
  }
}

export default QuantityPicker;
