import React from 'react';
import axios from 'axios';
import MenuList from './MenuList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
    };
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

  render() {
    const { items, categories } = this.state;
    return (
      <MenuList items={items} categories={categories} />
    );
  }
}

export default App;
