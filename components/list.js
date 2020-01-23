import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import data from '../data.json';

const useInfiniteScroll = (fetchMore, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {  
    const list = document.getElementById('list-container');
    list.addEventListener('scroll', (e) => {
      const el = e.target;
      if(el.scrollTop + el.clientHeight >= el.scrollHeight && hasMore) {
        setIsFetching(true);
      }
    });  
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchMore();
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

function List() {
  const deletedMessages = {};
  const [sortByDesc, setSortBy] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [rawMessages, setMessages] = useState(data.messages.slice(0,5));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreMessages, hasMore);
  
  function fetchMoreMessages() {
    if (!hasMore) {
      return;
    }
    setTimeout(() => {
      setMessages(prevState => {
        const newMessages =  [...prevState, ...data.messages.slice(prevState.length, prevState.length+5)];
        if (newMessages.length >= data.messages.length) {
          setHasMore(false);
        }
        return newMessages;
      });

      setIsFetching(false);
    }, 1000);
  }

  const handleDelete = keyToDelete => {
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
    const sentAt = moment(msg.sentAt).format(
      "dddd, MMMM Do YYYY, h:mm a"
    ).toString();
    return (
      <div className="item-container" key={idx}>
        <div className="item-body">
          <div>
            <span className="sub-text">
              Sent by
            </span> {" "} 
            <span className="userid-font">
            {msg.uuid}
            </span>
          </div>
          <span>{msg.content}</span>
          <span className="sub-text">{sentAt}</span>
        </div>
        <button className="close-btn btn" 
          onClick={() => handleDelete(keyFromMessage(msg))}
        > x
        </button>
      </div>
    );
  });

  return (
    <div id="list-container">
      <div className="sort-by-wrapper">
        <button className="sort-by-btn btn" 
          onClick={() => setSortBy(!sortByDesc)}>
          Sort by Date
        </button>
      </div>
        {messagesDisplay}
        {isFetching && hasMore && <p>...loading</p>}
    </div>
  );
}

function keyFromMessage(message) {
  return message.uuid + message.content + message.sentAt
}

export default List;