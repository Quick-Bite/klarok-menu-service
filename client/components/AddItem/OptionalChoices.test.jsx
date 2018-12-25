import React from 'react';
import { shallow } from 'enzyme';
import OptionalChoices from './OptionalChoices';

describe('OptionalChoices', () => {
  it('renders the choices passed to it', () => {
    const choices = [
      {
        _id: '1',
        name: 'Spam',
        price: 2.5,
      },
      {
        _id: '2',
        name: 'Eggs',
        price: 3,
      },
      {
        _id: '3',
        name: 'Ham',
        price: 3.5,
      },
    ];
    const updateChoice = () => {};
    const wrapper = shallow(
      <OptionalChoices optionalChoices={choices} updateOptionalChoice={updateChoice} />,
    );
    expect(wrapper.find('input')).toHaveLength(3);
  });
});
