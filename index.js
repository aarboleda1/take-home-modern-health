import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import MessageList from './components/messageList';

function App () {
  return <MessageList />;
}

render(<App />, document.getElementById('root'));
