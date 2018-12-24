import React from 'react';
import axios from 'axios';
import MenuList from './MenuList';
import AddItem from './AddItem/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      currentItem: null,
    };
    this.menuListItemClick = this.menuListItemClick.bind(this);
  }

  componentDidMount() {
    const url = `${window.location.pathname}/menu-items`;
    axios.get(url.replace('//', '/'))
      .then((response) => {
        const items = response.data;
        const categories = Array.from(new Set(items.map(item => item.category)));
        this.setState({ items, categories });
      });
  }

  menuListItemClick(itemId) {
    const url = `${window.location.pathname}/menu-items/${itemId}`;
    axios.get(url.replace('//', '/'))
      .then((response) => {
        const item = response.data;
        this.setState({ currentItem: item });
      });
  }

  render() {
    const { items, categories, currentItem } = this.state;
    return (
      <div>
        {currentItem ? <AddItem item={currentItem} /> : null}
        <MenuList
          items={items}
          categories={categories}
          menuListItemClick={this.menuListItemClick}
        />
      </div>
    );
  }
}

export default App;
