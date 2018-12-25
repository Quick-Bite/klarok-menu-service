import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Header from './Header';
import QuantityPicker from './QuantityPicker';
import OptionalChoices from './OptionalChoices';
import RequiredChoices from './RequiredChoices';
import Footer from './Footer';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      choices: {},
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
  }

  updateQuantity(quantity) {
    this.setState({ quantity });
  }

  updateChoice(event, _id, name, price) {
    const { checked } = event.target;
    const { choices } = this.state;
    const choicesCopy = Object.assign({}, choices);
    if (checked) {
      choicesCopy[_id] = { name, price };
      this.setState({ choices: choicesCopy });
    } else {
      delete choicesCopy[_id];
      this.setState({ choices: choicesCopy });
    }
  }

  render() {
    const { item } = this.props;
    const {
      name,
      price,
      description,
      optionalChoices,
      requiredChoiceCategories,
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
              : (
                <OptionalChoices
                  choices={optionalChoices}
                  updateChoice={this.updateChoice}
                />)}
            {requiredChoiceCategories.length === 0
              ? null
              : (
                <RequiredChoices
                  choiceCategories={requiredChoiceCategories}
                />)}
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
