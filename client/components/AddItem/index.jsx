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
    const { item: { requiredChoiceCategories, price } } = props;
    const requiredSelections = requiredChoiceCategories.reduce(
      (selections, { name }) => {
        selections[name] = null;
        return selections;
      }, {},
    );
    const readyToOrder = Object.keys(requiredSelections).length === 0;
    this.state = {
      requiredSelections,
      readyToOrder,
      quantity: 1,
      optionalChoices: {},
      basePrice: price,
      totalPrice: price,
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateOptionalChoice = this.updateOptionalChoice.bind(this);
    this.updateRequiredChoice = this.updateRequiredChoice.bind(this);
  }

  updateQuantity(quantity) {
    this.setState({ quantity }, () => {
      this.updateTotalPrice();
      this.updateReadyToOrder();
    });
  }

  updateOptionalChoice(event, _id, name, price) {
    const { checked } = event.target;
    const { optionalChoices } = this.state;
    const choicesCopy = Object.assign({}, optionalChoices);
    if (checked) {
      choicesCopy[_id] = { name, price };
      this.setState({ optionalChoices: choicesCopy }, this.updateTotalPrice);
    } else {
      delete choicesCopy[_id];
      this.setState({ optionalChoices: choicesCopy }, this.updateTotalPrice);
    }
  }

  updateRequiredChoice(category, _id, name, price) {
    const choice = { _id, name, price };
    const { requiredSelections } = this.state;
    const selections = Object.assign({}, requiredSelections);
    selections[category] = choice;
    this.setState({ requiredSelections: selections }, () => {
      this.updateTotalPrice();
      this.updateReadyToOrder();
    });
  }

  updateTotalPrice() {
    const {
      basePrice, quantity, requiredSelections, optionalChoices,
    } = this.state;
    const optionalChoicesTotal = Object
      .values(optionalChoices)
      .reduce((sum, choice) => sum + choice.price, 0);
    const requiredSelectionsTotal = Object
      .values(requiredSelections)
      .reduce((sum, selection) => (selection === null ? sum : sum + selection.price), 0);
    this.setState({
      totalPrice: quantity * (basePrice + optionalChoicesTotal + requiredSelectionsTotal),
    });
  }

  updateReadyToOrder() {
    const { quantity, requiredSelections } = this.state;
    const atLeastOneItem = quantity > 0;
    const hasAllRequiredSelections = Object
      .values(requiredSelections)
      .every(selection => selection !== null);
    const readyToOrder = atLeastOneItem && hasAllRequiredSelections;
    this.setState({ readyToOrder });
  }

  render() {
    const { item, close } = this.props;
    const {
      name,
      description,
      optionalChoices,
      requiredChoiceCategories,
    } = item;
    const { totalPrice, readyToOrder } = this.state;
    return (
      <form>
        <Nav name={name} close={close} />
        <div>
          <Header name={name} price={totalPrice} close={close} />
          <section>
            <p>{description}</p>
            <QuantityPicker updateQuantity={this.updateQuantity} />
          </section>
          <section>
            {optionalChoices.length === 0
              ? null
              : (
                <OptionalChoices
                  optionalChoices={optionalChoices}
                  updateOptionalChoice={this.updateOptionalChoice}
                />)}
            {requiredChoiceCategories.length === 0
              ? null
              : (
                <RequiredChoices
                  choiceCategories={requiredChoiceCategories}
                  updateRequiredChoice={this.updateRequiredChoice}
                />)}
            <div>Special Instructions Placeholder</div>
          </section>
          <Footer price={totalPrice} readyToOrder={readyToOrder} close={close} />
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
  close: PropTypes.func.isRequired,
};

export default AddItem;
