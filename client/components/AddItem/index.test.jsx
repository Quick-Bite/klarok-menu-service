import React from 'react';
import { mount } from 'enzyme';
import AddItem from './index';
import data from './sampleData/data';

jest.mock('./BlueTimes', () => (
  () => <div></div>
));
jest.mock('./Ribbon', () => (
  () => <div></div>
));

describe('AddItem optional choices', () => {
  let wrapper;
  let OptionalChoices;
  const close = () => {};
  beforeEach(() => {
    wrapper = mount(<AddItem item={data} close={close} />);
    OptionalChoices = wrapper.find('OptionalChoices');
  });

  it('does not have a choice in state when choice is not selected', () => {
    expect(Object.keys(wrapper.state().optionalChoices)).not.toContain('id10');
  });

  it('adds optional choice to state when selected', () => {
    // Example choice { _id: 'id10', name: 'parse', price: 14.50 };
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: true } });
    expect(wrapper.state().optionalChoices.id10).not.toBeUndefined();
    expect(wrapper.state().optionalChoices.id10.name).toBe('parse');
    expect(wrapper.state().optionalChoices.id10.price).toBe(14.50);
  });

  it('adds multiple optional choices', () => {
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: true } });
    OptionalChoices.find('input#id11').simulate('change', { target: { checked: true } });
    expect(wrapper.state().optionalChoices.id10).not.toBeUndefined();
    expect(wrapper.state().optionalChoices.id11).not.toBeUndefined();
  });

  it('removes optional choice if it has been deselected', () => {
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: true } });
    expect(wrapper.state().optionalChoices.id10).not.toBeUndefined();
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: false } });
    expect(wrapper.state().optionalChoices.id10).toBeUndefined();
  });
});

describe('AddItem required choices', () => {
  let wrapper;
  let RequiredChoices;
  let category1;
  let category2;
  const close = () => {};
  beforeEach(() => {
    wrapper = mount(<AddItem item={data} close={close} />);
    RequiredChoices = wrapper.find('RequiredChoices');
    category1 = 'Manager Rubber help-desk';
    category2 = 'Global morph unleash';
  });

  it('defaults the category to null when no choice is selected', () => (
    expect(wrapper.state().requiredSelections[category1]).toBeNull()
  ));

  it('sets the category to the selected choice', () => {
    // Example required choice
    // { _id: 'id2', name: 'Operative', price: 2.25 }
    RequiredChoices.find('input#id2').simulate('change', { target: { checked: true } });
    expect(wrapper.state().requiredSelections[category1]).not.toBeNull();
    expect(wrapper.state().requiredSelections[category1].name).toBe('Operative');
    expect(wrapper.state().requiredSelections[category1].price).toBe(2.25);
  });

  it('replaces the selected choice with a new one for a given category', () => {
    RequiredChoices.find('input#id2').simulate('change', { target: { checked: true } });
    RequiredChoices.find('input#id3').simulate('change', { target: { checked: true } });
    expect(wrapper.state().requiredSelections[category1].name).toBe('experiences Home ivory');
  });

  it('sets choices for multiple categories', () => {
    RequiredChoices.find('input#id2').simulate('change', { target: { checked: true } });
    RequiredChoices.find('input#id5').simulate('change', { target: { checked: true } });
    expect(wrapper.state().requiredSelections[category1]).not.toBeNull();
    expect(wrapper.state().requiredSelections[category2]).not.toBeNull();
  });
});

describe('AddItem total price', () => {
  let wrapper;
  const close = () => {};
  beforeEach(() => {
    wrapper = mount(<AddItem item={data} close={close} />);
  });

  it('equals base price by default', () => {
    // Base price is $20.00
    expect(wrapper.state().totalPrice).toBeCloseTo(20);
  });

  it('doubles when quantity is set to 2', () => {
    const QuantityPicker = wrapper.find('QuantityPicker');
    QuantityPicker.find('button#quantity-increment').simulate('click');
    expect(wrapper.state().totalPrice).toBeCloseTo(40);
  });

  it('adds the sum of optional choice prices', () => {
    const OptionalChoices = wrapper.find('OptionalChoices');
    // Select optional choice 'parse' with price $14.50
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: true } });
    // Select optional choice 'Taka' with price $18.30
    OptionalChoices.find('input#id12').simulate('change', { target: { checked: true } });
    expect(wrapper.state().totalPrice).toBeCloseTo(52.80);
  });

  it('adds the sum of required choice prices', () => {
    const RequiredChoices = wrapper.find('RequiredChoices');
    // Select required choice 'Operative' with price $2.25
    RequiredChoices.find('input#id2').simulate('change', { target: { checked: true } });
    // Select optional choice 'Interactions grid-enabled Clothing' with price $18.65
    RequiredChoices.find('input#id7').simulate('change', { target: { checked: true } });
    // Need setTimeout because it takes a while for setState to finish in this case
    expect(wrapper.state().totalPrice).toBeCloseTo(40.90);
  });

  it('applies quantity multiplier after adding choice prices', () => {
    const OptionalChoices = wrapper.find('OptionalChoices');
    const RequiredChoices = wrapper.find('RequiredChoices');
    const QuantityPicker = wrapper.find('QuantityPicker');
    // Select optional choice 'parse' with price $14.50
    OptionalChoices.find('input#id10').simulate('change', { target: { checked: true } });
    // Select required choice 'Operative' with price $2.25
    RequiredChoices.find('input#id2').simulate('change', { target: { checked: true } });
    QuantityPicker.find('button#quantity-increment').simulate('click');
    expect(wrapper.state().totalPrice).toBeCloseTo(73.50);
  });
});

describe('AddItem special instructions', () => {
  let wrapper;
  const close = () => {};
  beforeEach(() => {
    wrapper = mount(<AddItem item={data} close={close} />);
  });

  it('saves special instructions text that the user inputs', () => {
    const instructions = 'Please add steamed hams';
    const SpecialInstructions = wrapper.find('SpecialInstructions');
    SpecialInstructions.find('textarea').simulate('change',
      { target: { value: instructions } });
    expect(wrapper.state().specialInstructions).toBe(instructions);
  });
});
