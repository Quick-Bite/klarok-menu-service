import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  height: 127px;
  padding: 8px;
  background-image: url(${props => props.pictureUrl});
  border-radius: 4px;
`;

const PopularItem = ({ item, handleClick }) => (
  <Container onClick={() => handleClick(item.itemId)} pictureUrl={item.pictureUrl}>
    {item.name}
    {item.price}
    {item.pictureUrl}
  </Container>
);

PopularItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PopularItem;
