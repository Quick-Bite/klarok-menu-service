import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.h5`
  font-size: 17px;
  margin: 0;
  margin-right: 16px;
`;

const Button = styled.button`
  width: 36px;
  height: 36px;
  color: rgb(0, 111, 233);
  background-color: white;
  border-width: 2px;
  border-color: rgb(0, 111, 233);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #004FBF;
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const SvgWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin: 0 8px;
  width: 40px;
  height: 30px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0;
  text-align: center;
  font-size: 14px;

  /* This removes the up & down arrows inside an input tag of type 'number'*/
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      <Wrapper>
        <Header>Quantity</Header>
        <ControlsWrapper>
          <Button
            className="decrement"
            type="button"
            onClick={this.decrementQuantity}
            disabled={quantity <= 1}
          >
            <SvgWrapper>
              <svg id="minus" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M21 13.75H3v-3.5h18v3.5zm0 0" fill="currentColor"></path>
              </svg>
            </SvgWrapper>
          </Button>
          <Input value={quantity} type="number" onChange={this.handleChange} />
          <Button
            className="increment"
            type="button"
            onClick={this.incrementQuantity}
          >
            <SvgWrapper>
              <svg id="plus" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M13.75 3v7.25H21v3.5h-7.25V21h-3.5v-7.25H3v-3.5h7.25V3h3.5zm0 0" fill="currentColor"></path>
              </svg>
            </SvgWrapper>
          </Button>
        </ControlsWrapper>
      </Wrapper>
    );
  }
}

QuantityPicker.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
};

export default QuantityPicker;
