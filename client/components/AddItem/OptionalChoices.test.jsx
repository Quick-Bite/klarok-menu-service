import React from 'react';
import { shallow } from 'enzyme';
import OptionalChoices from './OptionalChoices';

describe('OptionalChoices', () => {
  it('renders the choices passed to it', () => {
    const choices = [
      {
        _id: 'id1',
        name: 'Spam',
        price: 2.5,
      },
      {
        _id: 'id2',
        name: 'Eggs',
        price: 3,
      },
      {
        _id: 'id3',
        name: 'Ham',
        price: 3.5,
      },
    ];
    const updateChoice = () => {};
    const wrapper = shallow(
      <OptionalChoices optionalChoices={choices} updateOptionalChoice={updateChoice} />,
    );
    expect(wrapper.find('#id1')).toHaveLength(1);
    expect(wrapper.find('#id2')).toHaveLength(1);
    expect(wrapper.find('#id3')).toHaveLength(1);
  });
});
