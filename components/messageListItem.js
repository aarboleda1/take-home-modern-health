import React, { useState, useEffect } from 'react';
import moment from 'moment';
import keyFromMessage from '../utils';

function MessageListItem({msg, handleDelete}) {
  const sentAt = moment(msg.sentAt).format(
    "dddd, MMMM Do YYYY, h:mm a"
  ).toString();  
  return (
    <div className="item-container">
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
}

export default MessageListItem;