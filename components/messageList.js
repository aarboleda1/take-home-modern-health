import React, { useState, useEffect } from 'react';
import MessageListItem from './messageListItem';

import data from '../data.json';
import keyFromMessage from '../utils';
import moment from 'moment';
import useInfiniteScroll from '../hooks';

const UP_ARROW = '\u2193';
const DOWN_ARROW = '\u2191';
const TIMEOUT_MS = 1000;

/** 
 * An Infinite Scrolling Message List
 */
function MessageList({pageSize}) {
  const deletedMessages = {};
  const [sortByDesc, setSortBy] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [rawMessages, setMessages] = useState(data.messages.slice(0, pageSize));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreMessages, hasMore);
  
  function fetchMoreMessages() {
    if (!hasMore) {
      return;
    }
    setTimeout(() => {
      setMessages(prevState => {
        const newMessages =  [...prevState, ...data.messages.slice(prevState.length, prevState.length + pageSize)];
        if (newMessages.length >= data.messages.length) {
          setHasMore(false);
        }
        return newMessages;
      });

      setIsFetching(false);
    }, TIMEOUT_MS);
  }

  function handleDelete(keyToDelete) {
    const filtered = rawMessages.filter(msg => {
      if (keyFromMessage(msg) !== keyToDelete) {
        return msg;
      }
    });
    setMessages(filtered);
  }

  const messagesDisplay = rawMessages.filter((msg) => {
    let key = keyFromMessage(msg);
    if (!deletedMessages[key]) {
      deletedMessages[key] = true;
      return true;
    } else {
      return false;
    }  
  }).sort((a,b) => {
    let first = a;
    let second = b;
    if (!sortByDesc) {
      first = b;
      second = a;
    } 
    return Date.parse(second.sentAt) - Date.parse(first.sentAt);
  }).map((msg, idx) => {
    return (
      <MessageListItem 
        handleDelete={handleDelete} 
        key={idx}
        msg={msg} 
      />
    );
  });

  return (
    <div id="list-container">
      <div className="sort-by-wrapper">
        <button className="sort-by-btn btn" 
          onClick={() => setSortBy(!sortByDesc)}>
          Sort by Date {sortByDesc ? UP_ARROW : DOWN_ARROW}
        </button>
      </div>
        {messagesDisplay}
        {isFetching && hasMore && <p>...loading</p>}
        {!hasMore && <p>No more messages to display!</p>}
    </div>
  );
}

export default MessageList;