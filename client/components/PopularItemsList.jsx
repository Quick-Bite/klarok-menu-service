import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PopularItem from './PopularItem';

const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0;
  padding: 0;
`;

const PopularItemsList = ({ mostPopularItems: items, menuListItemClick: handleClick }) => (
  <List>
    {items.map(item => (
      <li key={item._id}>
        <PopularItem item={item} handleClick={handleClick} />
      </li>
    ))}
  </List>
);

PopularItemsList.propTypes = {
  mostPopularItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default PopularItemsList;
