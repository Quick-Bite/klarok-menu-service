import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 2px auto;
  font-size: 1rem;
  background-color: white;
  max-height: 130px;
  border-radius: 4px;
`;

const Image = styled.img`
  width: 150px;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 115px;
  }
`;

const Body = styled.div`
  overflow: hidden;
  padding: 8px 12px;
`;

const Name = styled.h3`
  font-size: 15px;
  margin: 0;
`;

const Description = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  margin: 0;
  margin-bottom: 8px;
`;

const MenuListItem = ({ item, menuListItemClick }) => (
  <Container onClick={() => menuListItemClick(item.itemId)}>
    <Body>
      <Name>{item.name}</Name>
      <Description>{item.description}</Description>
      <p>{item.price}</p>
      {item.popular ? <p>Popular</p> : null}
      {item.spicy ? <p>Spicy</p> : null}
    </Body>
    <Image src={item.pictureUrl} alt="menu item" />
  </Container>
);

MenuListItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    restaurantId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    popular: PropTypes.bool.isRequired,
    spicy: PropTypes.bool.isRequired,
  }).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default MenuListItem;
