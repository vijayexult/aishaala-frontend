import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { json } from 'react-router-dom';

function Sidebar({ clickprevious, handleNewChat, isDarkMode, recentQueries }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const clicktheHistory = (message) => {
    clickprevious(message)
    console.log('thismsg', message)
  }

  const handleNewChatClick = () => {
    setIsAnimating(true);
    handleNewChat();
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation state after 1 second
  };



  let historyuser = localStorage.getItem("history") || "[]"
  try {
    historyuser = JSON.parse(historyuser).reverse();
  } catch (error) {
    console.log(error)
    historyuser = []
  }
  /*
  if(historyuser!=null && historyuser!= "[]"){
    historyuser = JSON.parse(historyuser).reverse()
    console.log(historyuser,"a")
  }
  else{
    historyuser=[]
  }
  */

  return (
    <div id="sidebarchat" className={`sidebar sidebarchat ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='LegAiLOGOName'>Aishaala</h1>
      <button className="activate-pro">AI Assistant For Teachers & Students</button>
      <hr className='linehor' />

      <div className="pinned-chats">
        <h1>Chats</h1>
        <button onClick={handleNewChatClick} className={`new-chat ${isAnimating ? 'animate' : ''}`}>New Chat
          <FontAwesomeIcon className='pencilIcon' icon={faPencil} />
        </button>
        <h3 className='h3tag'>Pinned chats</h3>
        <p>No pinned chats yet :(</p>
      </div>
      <div className="history">
        <h3 className='h3tag'>History</h3>
        <div className="recent-queries messageuserhistory">
          {historyuser.length === 0 || historyuser == null ? (
            <p>No History available.</p>
          ) : (
            historyuser.map((message, index) => (
              <div onClick={() => clicktheHistory(message)} key={index} className="historyItem">
                {message[0].text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>

  );
}

export default Sidebar;