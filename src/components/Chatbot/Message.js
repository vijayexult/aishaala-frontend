import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { IoCopyOutline, IoShareOutline } from 'react-icons/io5';
import { FaPlay, FaPause } from 'react-icons/fa';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import './Message.css';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Message = ({setTypingStatuss,typingstatuss, scrollToBottom,sender, text,lastmsgID,idd }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const utteranceRef = useRef(new SpeechSynthesisUtterance());

  console.log(idd===lastmsgID)

  useEffect(() => {
    if (sender === 'bot' && idd===lastmsgID) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
         
          setTypingStatuss(false)
          scrollToBottom();
           index++; 
        } else {
          clearInterval(timer); 
          setTypingStatuss(true)
          scrollToBottom();
        }
      }, 5);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(text);
    }
  }, [sender, text]);

  useEffect(() => {
    const utterance = utteranceRef.current;

    const onEnd = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.addEventListener('end', onEnd);

    return () => {
      utterance.removeEventListener('end', onEnd);
    };
  }, []);

  const renderFormattedText = (text) => {
    const html = marked(text);
    return DOMPurify.sanitize(html);
  };

  const copyToClipboard = () => {
    const html = renderFormattedText(displayedText);
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    document.body.appendChild(tempElement);
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }

    document.body.removeChild(tempElement);
  };

  const shareToPDF = () => {
    const html = renderFormattedText(displayedText);
    const pdfContent = htmlToPdfmake(html);
    const docDefinition = { content: pdfContent };

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const file = new File([blob], 'message.pdf', { type: 'application/pdf' });
      if (navigator.share) {
        navigator.share({
          title: 'Chat Message',
          text: 'Check out this chat message!',
          files: [file],
        }).then(() => {
          console.log('Share successful');
        }).catch((error) => {
          console.error('Error sharing:', error);
        });
      } else {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message.pdf';
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleAudioToggle = () => {
    const utterance = utteranceRef.current;

    if (!isSpeaking) {
      utterance.text = displayedText;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    } else if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    if (isPaused) {
      speechSynthesis.pause();
    } else if (isSpeaking) {
      speechSynthesis.resume();
    }
  }, [isPaused, isSpeaking]);

  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        {sender === 'bot' ? (
          <>
          
            <span className='spanmesage' dangerouslySetInnerHTML={{ __html: renderFormattedText(displayedText) }} />
            {typingstatuss && idd===lastmsgID ? (<div  className="message-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                <IoCopyOutline />
              </button>
              <button className="share-button" onClick={shareToPDF}>
                <IoShareOutline /> 
              </button>
              <button className="audio-button" onClick={handleAudioToggle}>
                {isPaused || !isSpeaking ? <FaPlay /> : <FaPause />}
              </button>
            </div>):""}
            {idd!==lastmsgID && (<div  className="message-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                <IoCopyOutline />
              </button>
              <button className="share-button" onClick={shareToPDF}>
                <IoShareOutline /> 
              </button>
              <button className="audio-button" onClick={handleAudioToggle}>
                {isPaused || !isSpeaking ? <FaPlay /> : <FaPause />}
              </button>
            </div>) }
            {copyStatus && <span className="copy-status">Copied!</span>}
          </>
        ) : (
          displayedText
        )}
      </div>
    </div>
  );
};

export default Message;

