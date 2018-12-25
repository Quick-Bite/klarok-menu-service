import React from 'react';
import { mount } from 'enzyme';
import AddItem from './index';
import data from './sampleData/data';

describe('AddItem total price', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AddItem item={data} />);
  });

  it('equals base price by default', () => {
    // Base price is $20.00
    expect(wrapper.state().totalPrice).toBeCloseTo(20);
  });

  it('doubles when quantity is set to 2', () => {
    const QuantityPicker = wrapper.find('QuantityPicker');
    QuantityPicker.find('.increment').simulate('click');
    expect(wrapper.state().totalPrice).toBeCloseTo(40);
  });

  it('adds the sum of optional choice prices', () => {
    const OptionalChoices = wrapper.find('OptionalChoices');
    // Select optional choice 'parse' with price $14.50
    OptionalChoices.find('#id10').simulate('change', { target: { checked: true } });
    // Select optional choice 'Taka' with price $18.30
    OptionalChoices.find('#id12').simulate('change', { target: { checked: true } });
    expect(wrapper.state().totalPrice).toBeCloseTo(52.80);
  });

  it('adds the sum of required choice prices', () => {
    const RequiredChoices = wrapper.find('RequiredChoices');
    // Select required choice 'Operative' with price $2.25
    RequiredChoices.find('#id2').simulate('change', { target: { checked: true } });
    // Select optional choice 'Interactions grid-enabled Clothing' with price $18.65
    RequiredChoices.find('#id7').simulate('change', { target: { checked: true } });
    // Need setTimeout because it takes a while for setState to finish in this case
    setTimeout(() => expect(wrapper.state().totalPrice).toBeCloseTo(40.90), 100);
  });

  it('applies quantity multiplier after adding choice prices', () => {
    const OptionalChoices = wrapper.find('OptionalChoices');
    const RequiredChoices = wrapper.find('RequiredChoices');
    const QuantityPicker = wrapper.find('QuantityPicker');
    // Select optional choice 'parse' with price $14.50
    OptionalChoices.find('#id10').simulate('change', { target: { checked: true } });
    // Select required choice 'Operative' with price $2.25
    RequiredChoices.find('#id2').simulate('change', { target: { checked: true } });
    setTimeout(() => {
      // Set quantity to 2
      QuantityPicker.find('.increment').simulate('click');
      expect(wrapper.state().totalPrice).toBeCloseTo(73.50);
    }, 100);
  });
});
