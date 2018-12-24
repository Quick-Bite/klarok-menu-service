import React from 'react';
import { shallow } from 'enzyme';
import MenuList from './MenuList';
import MenuListItem from './MenuListItem';

describe('MenuList', () => {
  let items;
  let categories;
  const menuListItemClick = () => {};

  beforeEach(() => {
    items = [
      {
        itemId: 1,
        restaurantId: 1,
        name: 'Bacon pancakes',
        category: 'Breakfast',
        description: 'Bacon pancakes, makin bacon pancakes',
        price: 8,
        pictureUrl: 'http://www.example.com/path/to/pic',
        popular: true,
        spicy: false,
      },
      {
        itemId: 2,
        restaurantId: 1,
        name: 'Together breakfast',
        category: 'Breakfast',
        description: 'Pancakes, syrup, popcorn, whipped cream, and strawberry',
        price: 15,
        pictureUrl: 'http://www.example.com/path/to/pic',
        popular: false,
        spicy: false,
      },
      {
        itemId: 3,
        restaurantId: 1,
        name: 'Krusty burger',
        category: 'Burgers',
        description: 'They drove a dump truck full of money to my house',
        price: 6,
        pictureUrl: 'http://www.example.com/path/to/pic',
        popular: false,
        spicy: false,
      },
    ];
    categories = ['Breakfast', 'Burgers'];
  });

  it('renders the number of items given as props', () => {
    const wrapper = shallow(
      <MenuList
        items={items}
        categories={categories}
        menuListItemClick={menuListItemClick}
      />,
    );
    expect(wrapper.find(MenuListItem)).toHaveLength(3);
  });

  it('renders the items in separate lists by category', () => {
    const wrapper = shallow(
      <MenuList
        items={items}
        categories={categories}
        menuListItemClick={menuListItemClick}
      />,
    );
    const categoryWrappers = wrapper.find('.category');
    expect(categoryWrappers).toHaveLength(2);
    categoryWrappers.forEach((categoryWrapper, index) => {
      const numChildren = index === 0 ? 2 : 1;
      expect(categoryWrapper.find(MenuListItem)).toHaveLength(numChildren);
    });
  });
});
