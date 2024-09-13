// src/Chatbot.js
import "./Chatbot.css"
import React, { useEffect, useState, useRef, Fragment } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faGreaterThan, faMinus, faPaperPlane, faMicrophone, faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'
import { IoReloadCircleOutline } from 'react-icons/io5';
import { marked } from 'marked';
import Message from './Message';
import DOMPurify from 'dompurify';
import { text } from "@fortawesome/fontawesome-svg-core";
import { json } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import ReactLoading from 'react-loading';

//icon sidebar

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Lists = {
  legalConsumersList: {
    content: [{
      id: uuidv4(),
      text: "How do I file for divorce and what are the requirements?"
    },
    {
      id: uuidv4(),
      text: "What are my rights as an employee?"

    },
    {
      id: uuidv4(),
      text: "Provide examples of [legal case/issue]"
    }]
  },
  legalResearchList: {
    content: [
      {
        id: uuidv4(),
        text: 'Prompts for Legal Research'
      }, {
        id: uuidv4(),
        text: "What are the latest developments in [legal area]?"
      },
      {
        id: uuidv4(),
        text: "What are the relevant laws or regulations regarding [legal issue]?"
      }, {
        id: uuidv4(),
        text: "What are the pros and cons of [legal argument/position]?"
      }, {
        id: uuidv4(),
        text: "Provide a summary of [case name]"
      }, {
        id: uuidv4(),
        text: "Discuss the role of [legal principle or concept] in [specific area of law]"
      }]

  },
  DraftingLegalDocuments: {
    content: [{
      id: uuidv4(),
      text: "Draft a Sales Agreement for transferring ownership of a vehicle"
    },
    {
      id: uuidv4(),
      text: "Write a Cease and Desist Letter for copyright infringement"

    },
    {
      id: uuidv4(),
      text: "What are the recommended provisions for a Licensing Agreement?"
    },
    {
      id: uuidv4(),
      text: "What are the necessary elements for an Employment Contract?"
    }, {
      id: uuidv4(),
      text: "What are the typical terms for a Joint Venture Agreement?"
    }, {
      id: uuidv4(),
      text: "What are the most common mistakes to avoid when drafting a Settlement Agreement?"
    }

    ]
  },
  familylawList: {
    content: [{
      id: uuidv4(),
      text: "Draft a prenuptial agreement for engaged couples who want to protect their assets"
    },
    {
      id: uuidv4(),
      text: "Create a child custody agreement for divorcing parents"

    },
    {
      id: uuidv4(),
      text: "Write a postnuptial agreement for spouses who want to modify their marital property rights"
    },

    {
      id: uuidv4(),
      text: "What are the standard clauses for a child support agreement?"
    },
    {
      id: uuidv4(),
      text: "What are the most common mistakes to avoid when drafting a separation agreement?"
    }


    ]
  },
  personalinjuryList: {
    content: [{
      id: uuidv4(),
      text: "Draft a demand letter for a slip and fall case"
    },
    {
      id: uuidv4(),
      text: "Draft a settlement agreement for a car accident case involving multiple parties"

    },
    {
      id: uuidv4(),
      text: "Write a complaint for a medical malpractice lawsuit"
    }]
  },
  EmployLabourList: {
    content: [{
      id: uuidv4(),
      text: "Draft a non-disclosure agreement for a new employee."
    },
    {
      id: uuidv4(),
      text: "Write a workplace harassment policy for a small business."

    },
    {
      id: uuidv4(),
      text: "What should be included in a severance agreement?"
    }]
  },
  immigrationList: {
    content: [{
      id: uuidv4(),
      text: "Write a request for evidence response for an H-1B visa applicant"
    },
    {
      id: uuidv4(),
      text: "Draft a memorandum of understanding for a family seeking asylum"

    },
    {
      id: uuidv4(),
      text: "Write a request for evidence response for an H-1B visa applicant"
    }]
  },

}



const Chatbot = ({ isDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [modelopened, setmodelopened] = useState(false)
  const [customprompt, setcustomPrompt] = useState([])
  const [lastmsgid, setlastmsgid] = useState('')
  const [newprompt, setnewPrompt] = useState({})
  const [promptList, setPromptList] = useState([{
    id: uuidv4(),
    text: "write your custom"
  }])

  const messagesEndRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [botMessage, setBotMessage] = useState(null);
  const [recentQueries, setRecentQueries] = useState([]);
  const [typingstatus, setTypingStatus] = useState(false)
  const [history, sethistory] = useState([])



  useEffect(() => {
    // Load chat history from local storage

    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);
    console.log(Lists.legalConsumersList.content)
    const getlocal = JSON.parse(localStorage.getItem('promptsList')) || [];
    if (promptList.length === 1) {
      setPromptList((prevState) => ([...prevState, ...getlocal]));
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage whenever messages state changes
    const a = localStorage.getItem("history")
    if (a == null) {
      localStorage.setItem("history", history)
    }


    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const [showContent, setShowContent] = useState({
    customPrompts: false,
    legalConsumers: false,
    legalResearch: false,
    draftingDocuments: false,
    familyLawyers: false,
    personalInjury: false,
    employmentLabor: false,
    immigration: false,
  });

  const toggleContent = (section) => {
    setShowContent((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message, regenerate = false) => {


    const userMessage = { id: uuidv4(), sender: 'user', text: message };
    const userMessageses = messages.filter(msg => msg.sender === 'user');
    setRecentQueries(userMessageses.slice(-5).reverse());
    console.log('user', recentQueries)

    if (!regenerate) {
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    }


    setInput('');
    setIsTyping(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      conversationHistory.push({ role: 'user', content: message });
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: conversationHistory,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });



      let botMessageContent = response.data.choices[0].message.content;
      botMessageContent = formatReply(botMessageContent);
      setBotMessage(botMessageContent);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const formatReply = (reply) => {
    const html = marked(reply);
    return DOMPurify.sanitize(html);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }

  };

  const handleRegenerate = (message) => {
    sendMessage(message, true);
  };

  useEffect(() => {
    if (botMessage) {
      const botMessageObj = { id: uuidv4(), sender: 'bot', text: botMessage };
      setlastmsgid(botMessageObj.id)
      setMessages((prevMessages) => [...prevMessages, botMessageObj]);

      setBotMessage(null);
    }
  }, [botMessage]);

  console.log(process.env.REACT_APP_OPENAI_API_KEY)

  const popupbtnClicked = () => {
    setmodelopened(true)
  }

  const closePromptPopup = () => {
    setmodelopened(false)
  }

  const changesearchPrompt = (e) => {

    const promptOb = {
      id: uuidv4(),
      text: e.target.value
    }
    setnewPrompt(promptOb)

  }
  const h = [{ id: uuidv4(), text: "provide Custom" }]


  const addCustomList = () => {
    const v = document.getElementById('customPromptInputEle').value;
    if (v !== '') {
      const newPromptObj = {
        id: uuidv4(),
        text: v
      };

      let retrieve = JSON.parse(localStorage.getItem('promptsList')) || [];
      retrieve.push(newPromptObj);
      localStorage.setItem('promptsList', JSON.stringify(retrieve));
      setPromptList(retrieve);

      document.getElementById('customPromptInputEle').value = '';
      alert('Custom prompt added successfully');
    } else {
      alert('Please provide a value');
    }
  };

  const promptClick = (each) => {
    document.getElementById('inputElement').value = each.text
    setInput(each.text)
    closePromptPopup()

  }

  const clickpreviousmsg = (message) => {

    setInput(message.text)
    setMessages(message)
  }

  Lists.legalConsumersList.content.map((each) => {
    console.log(each.text)
  })

  const handleNewChat = async () => {
    if (messages.length !== 0) {
      sethistory([...history, [...messages]]);
      const newHistory = [...history, [...messages]];

      // Ensure the history length does not exceed 10
      if (newHistory.length > 10) {
        newHistory = newHistory.slice(0, 10);
      }

      sethistory(newHistory);
      localStorage.setItem('history', JSON.stringify(history));
      console.log(history)
      setMessages([]);
      localStorage.removeItem('chatMessages');
    }

  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (

    <div className="mainnn">

      <Drawer PaperProps={{
        style: {
          backgroundColor: '#252525', // Set your desired background color here
          // Optional: set the text color
        },
      }} anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List PaperProps={{
          style: {
            backgroundColor: '#252525', // Set your desired background color here
            // Optional: set the text color
          },
        }} >


          <Sidebar className="sidebarmobile" handleNewChat={handleNewChat} clickprevious={clickpreviousmsg} recentQueries={recentQueries} isDarkMode={isDarkMode} />


        </List>
      </Drawer>


      <div className="sidebarmobile">

        <Sidebar handleNewChat={handleNewChat} clickprevious={clickpreviousmsg} recentQueries={recentQueries} isDarkMode={isDarkMode} />
      </div>
      <div className={`chat-area chatareamobile ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="chatbox chatboxmobile" >
          <div className="mobile-slide-and-chat-head-cont">


            <IconButton className="sidebaropenbutton" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <FontAwesomeIcon className="drawericon" icon={faGreaterThan} />
            </IconButton>

            <h3 className="chathead">Chats</h3></div>
          {messages.map((msg, index) => {
            if (msg.sender === 'user') {
              return (
                <div key={index} className="chatContsender" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                  <span className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender === 'user' ? "senderClass" : "botclass"}`} >{msg.text}</span>
                </div>
              )
            }
            else {
              return (

                <div key={index} className="chatCont" style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }} >
                  {/*<p className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</p>*/}
                  {/*   <span className={`${isDarkMode ? 'senderDark' : 'senderlight'} ${msg.sender==='user'?"senderClass":"botclass"}`} >{msg.text}</span>*/}
                  <Message setTypingStatuss={setTypingStatus} typingstatuss={typingstatus} scrollToBottom={scrollToBottom} key={index} sender={msg.sender} text={msg.text} lastmsgID={lastmsgid} idd={msg.id} messagesList={messages} />
                  {typingstatus && <button className="regenratebutton">
                    <IoReloadCircleOutline
                      className="regenerate-icon"
                      onClick={() => handleRegenerate(msg.text)}
                    />
                  </button>}


                </div >

              )
            }
          })}
          {isTyping && (
            <div className="loadingmsgContainer">
              <ReactLoading type="bubbles" color="black" height={30} width={30} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="promptBtnContainer">
          <button onClick={popupbtnClicked} className="prompsBtn">
            Prompts
          </button>
          <Popup open={modelopened} onClose={closePromptPopup} className="popupclass" modal>
            {close => (
              <div className="modal-prompt">


                <button className="close" onClick={close}>
                  &times;
                </button>


                <div className="header">Prompts Base</div>
                <div className="content2">
                  <p className="promptPopupDescript">Choose the prompt that suits you best. Once you click, it'll appear in the text input field. You can then send it as is or add your own words.</p>
                  <div className="customPromptinputContainer">
                    <input placeholder="create a custom" id="customPromptInputEle" className="inputPrompt" type="text" onChange={changesearchPrompt} />
                    <button onClick={addCustomList} className="buttonPlusIcon">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>

                  </div>
                  <div className="promptsCont">


                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('customPrompts')}>
                        Custom prompts
                        {showContent.customPrompts ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      <div className="contentview">
                        {showContent.customPrompts && (
                          <div className="contentview">
                            {promptList.map((each) => (

                              <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>


                            ))}

                          </div>

                        )}
                      </div>

                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('legalConsumers')}>
                        Prompts for Legal Consumers
                        {showContent.legalConsumers ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.legalConsumers && (
                        <>
                          {Lists.legalConsumersList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('legalResearch')}>
                        Prompts for Legal Research
                        {showContent.legalResearch ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.legalResearch && (
                        <>
                          {Lists.legalResearchList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('draftingDocuments')}>
                        Prompts for Drafting Legal Documents
                        {showContent.draftingDocuments ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.draftingDocuments && (
                        <>
                          {Lists.DraftingLegalDocuments.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('familyLawyers')}>
                        Prompts for Family Lawyers
                        {showContent.familyLawyers ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.familyLawyers && (
                        <>
                          {Lists.familylawList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('personalInjury')}>
                        Prompts for Personal Injury Lawyers
                        {showContent.personalInjury ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.personalInjury && (
                        <>
                          {Lists.personalinjuryList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('employmentLabor')}>
                        Prompts for Employment Labor lawyers
                        {showContent.employmentLabor ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.employmentLabor && (
                        <>
                          {Lists.EmployLabourList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>
                    <div className="toggle-content">
                      <button className="toggle-button" onClick={() => toggleContent('immigration')}>
                        Prompts for Immigration lawyers
                        {showContent.immigration ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                      </button>
                      {showContent.immigration && (
                        <>
                          {Lists.immigrationList.content.map((each) => (
                            <button onClick={() => promptClick(each)} key={each.id} className="contentParaShow">{each.text}</button>

                          ))}

                        </>
                      )}
                    </div>



                  </div>

                </div>
              </div>
            )}
          </Popup>
        </div>
        <div className="inputandSendbtnContainer">
          <form onSubmit={handleSubmit} className="inputSendContn">
            <FontAwesomeIcon className="micIcon" icon={faMicrophone} />
            <FontAwesomeIcon className="micIcon" icon={faCamera} />
            <input
              className='inputmsg'
              id="inputElement"
              type="text"
              placeholder="Ask Your Question?"
              value={input}
              onChange={(e) => setInput(e.target.value)}

            />
            <button className="sendMsgbtn" >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Chatbot;
