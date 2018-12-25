import React from 'react';
import { shallow } from 'enzyme';
import RequiredChoices from './RequiredChoices';

describe('RequiredChoices', () => {
  const choiceCategories = [
    {
      name: 'size',
      choices: [
        {
          _id: '1',
          name: 'small',
          price: 1,
        },
        {
          _id: '2',
          name: 'medium',
          price: 3,
        },
        {
          _id: '3',
          name: 'large',
          price: 5,
        }
      ],
    },
    {
      name: 'drink',
      choices: [
        {
          _id: '4',
          name: 'coke',
          price: 1,
        },
        {
          _id: '5',
          name: 'pepsi',
          price: 1,
        },
      ],
    },
  ];
  const updateRequiredChoice = () => {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RequiredChoices
        choiceCategories={choiceCategories}
        updateRequiredChoice={updateRequiredChoice}
      />,
    );
  });

  it('renders the correct number of categories', () => {
    expect(wrapper.find('h4')).toHaveLength(2);
  });

  it('renders the correct number of choices', () => {
    expect(wrapper.find('input')).toHaveLength(5);
  });
});
