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
    const { item: { requiredChoiceCategories } } = props;
    const requiredSelections = requiredChoiceCategories.reduce(
      (selections, { name }) => {
        selections[name] = null;
        return selections;
      }, {},
    );
    this.state = {
      requiredSelections,
      quantity: 1,
      optionalChoices: {},
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateOptionalChoice = this.updateOptionalChoice.bind(this);
    this.updateRequiredChoice = this.updateRequiredChoice.bind(this);
  }

  updateQuantity(quantity) {
    this.setState({ quantity });
  }

  updateOptionalChoice(event, _id, name, price) {
    const { checked } = event.target;
    const { optionalChoices } = this.state;
    const choicesCopy = Object.assign({}, optionalChoices);
    if (checked) {
      choicesCopy[_id] = { name, price };
      this.setState({ optionalChoices: choicesCopy });
    } else {
      delete choicesCopy[_id];
      this.setState({ optionalChoices: choicesCopy });
    }
  }

  updateRequiredChoice(category, _id, name, price) {
    const choice = { _id, name, price };
    const { requiredSelections } = this.state;
    const selections = Object.assign({}, requiredSelections);
    selections[category] = choice;
    this.setState({
      requiredSelections: selections,
    });
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
