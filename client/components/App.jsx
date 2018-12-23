import React from 'react';
import MenuList from './MenuList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }] };
  }

  render() {
    const { items } = this.state;
    return (
      <MenuList items={items} />
    );
  }
}

export default App;
