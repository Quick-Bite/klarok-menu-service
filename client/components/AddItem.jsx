import React from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ item }) => (
  <form>
    <nav>Nav Placeholder</nav>
    <div>
      <header>
        <div>
          <h3>{item.name}</h3>
          <h5>{item.price}</h5>
        </div>
      </header>
      <section>
        <p>{item.description}</p>
        <div>Quantity Form Control Placeholder</div>
      </section>
      <section>
        <div>Optional Choices Placeholder</div>
        <div>Required Choices Placeholder</div>
        <div>Special Instructions Placeholder</div>
      </section>
      <footer>
        <button type="button">Add to bag</button>
      </footer>
    </div>
  </form>
);

AddItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    restaurantId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    popular: PropTypes.bool.isRequired,
    spicy: PropTypes.bool.isRequired,
    requiredChoiceCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    optionalChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default AddItem;
