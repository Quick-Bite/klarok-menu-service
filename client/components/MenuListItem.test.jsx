import React from 'react';
import { shallow } from 'enzyme';
import MenuListItem from './MenuListItem';

jest.mock('styled-icons/fa-solid', () => ({
  Award: 'Award',
  Fire: 'Fire',
}));

describe('MenuListItem', () => {
  let item;
  const menuListItemClick = () => {};

  beforeEach(() => {
    item = {
      itemId: 1,
      restaurantId: 1,
      name: 'Bacon pancakes',
      description: 'Bacon pancakes, makin bacon pancakes',
      price: 8,
      pictureUrl: 'http://www.example.com/path/to/pic',
      popular: true,
      spicy: false,
    };
  });

  it('renders the name of the item', () => {
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    // expect(wrapper.contains(<h3>Bacon pancakes</h3>)).toBe(true);
    expect(wrapper.find('#Name').text()).toBe('Bacon pancakes');
  });

  it('renders the description', () => {
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.find('#Description').text()).toBe('Bacon pancakes, makin bacon pancakes');
  });

  it('indicates the item is popular if it is popular', () => {
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.find('#Popular').exists()).toBe(true);
  });

  it('does not indicate the item is popular if it is not popular', () => {
    item.popular = false;
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.find('#Popular').exists()).toBe(false);
  });
});
