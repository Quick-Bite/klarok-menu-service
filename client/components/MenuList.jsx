import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuListItem from './MenuListItem';

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style-type: none;

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }
`;

const MenuList = ({ items, categories, menuListItemClick }) => (
  <div>
    {categories.map(category => (
      <div key={category} className="category">
        <h2>{category}</h2>
        <ListContainer>
          {items
            .filter(item => item.category === category)
            .map(item => (
              <li key={item.itemId}>
                <MenuListItem item={item} menuListItemClick={menuListItemClick} />
              </li>
            ))}
        </ListContainer>
      </div>
    ))}
  </div>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default MenuList;
