import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import MessageList from './components/messageList';

function App () {
  return <MessageList pageSize={5}/>;
}

render(<App />, document.getElementById('root'));
