import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Header from './Header';
import QuantityPicker from './QuantityPicker';
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
    return (
      <form>
        <Nav name={item.name} />
        <div>
          <Header name={item.name} price={item.price} />
          <section>
            <p>{item.description}</p>
            <QuantityPicker updateQuantity={this.updateQuantity} />
          </section>
          <section>
            <div>Optional Choices Placeholder</div>
            <div>Required Choices Placeholder</div>
            <div>Special Instructions Placeholder</div>
          </section>
          <Footer price={item.price} />
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
