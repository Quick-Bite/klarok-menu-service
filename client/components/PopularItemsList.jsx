import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PopularItem from './PopularItem';
import PopularBadge from './PopularBadge';

const Heading = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 47px;
  padding-top: 38px;
  padding-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 23.3px;
  margin: 0;
  margin-right: 5px;
`;

const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0;
  padding: 0;
`;

const BadgeWrapper = styled.div`
  padding-bottom: 2px;
`;

const PopularItemsList = ({ mostPopularItems: items, menuListItemClick: handleClick }) => (
  <div>
    <Heading>
      <Title>Most Popular</Title>
      <BadgeWrapper>
        <PopularBadge size="20" />
      </BadgeWrapper>
    </Heading>
    <List>
      {items.map(item => (
        <li key={item._id}>
          <PopularItem item={item} handleClick={handleClick} />
        </li>
      ))}
    </List>
  </div>
);

PopularItemsList.propTypes = {
  mostPopularItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default PopularItemsList;
