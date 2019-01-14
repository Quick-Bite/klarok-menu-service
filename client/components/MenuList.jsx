import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuListItem from './MenuListItem';
import PopularItemsList from './PopularItemsList';

const Outer = styled.section`
  margin: 0 8px;
`;

const CategoryHeader = styled.h2`
  font-size: 23px;
  margin-top: 30px;
  margin-bottom: 0;
  padding: 8px 0px;
`;

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  list-style-type: none;
  margin: 0 0;
  padding: 0;

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }
`;

const MenuList = ({ items, categories, menuListItemClick, mostPopularItems }) => (
  <Outer>
    <PopularItemsList mostPopularItems={mostPopularItems} menuListItemClick={menuListItemClick} />
    {categories.map(category => (
      <div key={category} className="category">
        <CategoryHeader>{category}</CategoryHeader>
        <ListContainer>
          {items
            .filter(item => item.category === category)
            .map(item => (
              <li key={item.item_id}>
                <MenuListItem item={item} menuListItemClick={menuListItemClick} />
              </li>
            ))}
        </ListContainer>
      </div>
    ))}
  </Outer>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostPopularItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default MenuList;
