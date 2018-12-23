import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuListItem from './MenuListItem';

configure({ adapter: new Adapter() });

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
    expect(wrapper.contains(<h3>Bacon pancakes</h3>)).toBe(true);
  });

  it('renders the description', () => {
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.contains(<p>Bacon pancakes, makin bacon pancakes</p>)).toBe(true);
  });

  it('indicates the item is popular if it is popular', () => {
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.contains(<p>Popular</p>)).toBe(true);
  });

  it('does not indicate the item is popular if it is not popular', () => {
    item.popular = false;
    const wrapper = shallow(<MenuListItem item={item} menuListItemClick={menuListItemClick} />);
    expect(wrapper.contains(<p>Popular</p>)).toBe(false);
  });
});
