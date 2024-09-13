import React from 'react';
import './ChatArea.css';

function ChatArea({ isDarkMode,msgesList }) {
  return (
    <div className={`chat-area ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chat-header">
        <h2 className='head-newchat'>New chat</h2>
        <div className='chatbox1'>
          {msgesList.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} className={msg.sender==='user'?"senderClass":"botclass"}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default ChatArea;