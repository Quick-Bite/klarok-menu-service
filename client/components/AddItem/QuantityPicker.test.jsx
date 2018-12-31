import React from 'react';
import { shallow } from 'enzyme';
import QuantityPicker from './QuantityPicker';

describe('QuantityPicker', () => {
  const updateQuantity = () => {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<QuantityPicker updateQuantity={updateQuantity} />);
  });

  it('should update the quantity state when input value changes', () => {
    const input = wrapper.find('#quantity-input');
    input.simulate('change', { target: { value: '2' } });
    expect(wrapper.state().quantity).toBe(2);
  });

  it('should increase the quantity state by 1 when clicking the (+) button', () => {
    const plusButton = wrapper.find('#quantity-increment');
    plusButton.simulate('click');
    expect(wrapper.state().quantity).toBe(2);
  });

  it('should decrease the quantity state by 1 when clicking the (-) button', () => {
    const input = wrapper.find('#quantity-input');
    const minusButton = wrapper.find('#quantity-decrement');
    input.simulate('change', { target: { value: '2' } });
    minusButton.simulate('click');
    expect(wrapper.state().quantity).toBe(1);
  });

  it('should set the quantity state to 0 when user empties the input', () => {
    const input = wrapper.find('#quantity-input');
    input.simulate('change', { target: { value: '' } });
    expect(wrapper.state().quantity).toBe(0);
  });
});
