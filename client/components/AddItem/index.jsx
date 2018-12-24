import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Header from './Header';
import QuantityPicker from './QuantityPicker';
import OptionalChoices from './OptionalChoices';
import Footer from './Footer';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateQuantity(quantity) {
    this.setState({ quantity });
  }

  render() {
    const { item } = this.props;
    const {
      name,
      price,
      description,
      optionalChoices,
    } = item;
    return (
      <form>
        <Nav name={name} />
        <div>
          <Header name={name} price={price} />
          <section>
            <p>{description}</p>
            <QuantityPicker updateQuantity={this.updateQuantity} />
          </section>
          <section>
            {optionalChoices.length === 0
              ? null
              : <OptionalChoices optionalChoices={optionalChoices} />}
            <div>Required Choices Placeholder</div>
            <div>Special Instructions Placeholder</div>
          </section>
          <Footer price={price} />
        </div>
      </form>
    );
  }
}

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
