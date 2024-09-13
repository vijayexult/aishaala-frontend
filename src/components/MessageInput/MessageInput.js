import React,{useState} from 'react';
import './MessageInput.css';

function MessageInput({ isDarkMode,sendMsg }) {
  const [msgiven,setmsggiven] = useState("")
  const Oninput = (e)=>{
    setmsggiven(e.target.value)
    console.log(msgiven)
  }

  const sendbuttonclicked = ()=>{
    sendMsg(msgiven)
  }



  return (
    <div className={`message-input ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    
      <input type="text" placeholder="Type your message here" />
      <button   className='senbtn'>Send</button>
    </div>
   
  );
}

export default MessageInput;