import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import List from './components/list';

class App extends Component {
  render() {
    return <List />;
  }
}


render(<App />, document.getElementById('root'));
