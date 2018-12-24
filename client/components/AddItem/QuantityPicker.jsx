import React from 'react';

class QuantityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputElement = event.target;
    const quantity = Number(inputElement.value);
    inputElement.value = quantity;
    this.setState({ quantity });
  }

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <h5>Quantity</h5>
        <div>
          <button type="button">-</button>
          <input value={quantity} type="number" onChange={this.handleChange} />
          <button type="button">+</button>
        </div>
      </div>
    );
  }
}

export default QuantityPicker;
