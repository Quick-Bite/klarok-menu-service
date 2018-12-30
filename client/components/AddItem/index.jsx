import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav';
import Header from './Header';
import QuantityPicker from './QuantityPicker';
import OptionalChoices from './OptionalChoices';
import RequiredChoices from './RequiredChoices';
import SpecialInstructions from './SpecialInstructions';
import Footer from './Footer';

const ModalOutside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalMain = styled.form`
  background-color: white;
  max-width: 768px;
  max-height: 92%;
  overflow-y: scroll;
  position: relative;
  border-radius: 5px;
`;

const ModalBody = styled.div`
  padding: 0 32px;
`;

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
      specialInstructions: '',
      scrollTop: 0,
      navNeverShown: true,
    };
    this.SHOW_NAV_Y = 50;
    
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateOptionalChoice = this.updateOptionalChoice.bind(this);
    this.updateRequiredChoice = this.updateRequiredChoice.bind(this);
    this.updateSpecialInstructions = this.updateSpecialInstructions.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
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

  updateSpecialInstructions(event) {
    this.setState({ specialInstructions: event.target.value });
  }

  updateScroll(event) {
    const { navNeverShown, scrollTop } = this.state;
    this.setState({ scrollTop: event.target.scrollTop });
    if (navNeverShown && scrollTop > this.SHOW_NAV_Y) {
      this.setState({ navNeverShown: false });
    }
  }

  render() {
    const { item, close } = this.props;
    const {
      name,
      description,
      optionalChoices,
      requiredChoiceCategories,
      pictureUrl,
    } = item;
    const {
      totalPrice, readyToOrder, scrollTop, navNeverShown,
    } = this.state;
    const optionalChoicesComponent = (optionalChoices.length === 0)
      ? null
      : (
        <OptionalChoices
          optionalChoices={optionalChoices}
          updateOptionalChoice={this.updateOptionalChoice}
        />);
    const requiredChoicesComponent = (requiredChoiceCategories.length === 0)
      ? null
      : (
        <RequiredChoices
          choiceCategories={requiredChoiceCategories}
          updateRequiredChoice={this.updateRequiredChoice}
        />);
    const nav = (navNeverShown)
      ? null
      : <Nav name={name} close={close} scrollTop={scrollTop} SHOW_Y={this.SHOW_NAV_Y} />;
    return (
      <ModalOutside onClick={event => (event.target === event.currentTarget ? close() : null)}>
        <ModalMain onScroll={this.updateScroll}>
          {nav}
          <Header name={name} price={totalPrice} close={close} pictureUrl={pictureUrl} />
          <ModalBody>
            <section>
              <p>{description}</p>
              <QuantityPicker updateQuantity={this.updateQuantity} />
            </section>
            <section>
              {optionalChoicesComponent}
              {requiredChoicesComponent}
              <SpecialInstructions handleChange={this.updateSpecialInstructions} />
            </section>
            <Footer price={totalPrice} readyToOrder={readyToOrder} close={close} />
          </ModalBody>
        </ModalMain>
      </ModalOutside>
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
