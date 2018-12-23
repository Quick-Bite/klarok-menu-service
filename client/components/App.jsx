import React from 'react';
import axios from 'axios';
import MenuList from './MenuList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    const url = `${window.location.pathname}/menu-items`;
    axios.get(url.replace('//', '/'))
      .then((response) => {
        const items = response.data;
        this.setState({ items });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <MenuList items={items} />
    );
  }
}

export default App;
