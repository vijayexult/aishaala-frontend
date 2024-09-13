/*import React, { useState, useRef, useEffect, useCallback } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';

import 'react-h5-audio-player/lib/styles.css';
import "./voiceAiComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../ThemeContext";


const agentId = process.env.REACT_APP_AGENT_ID;
const apiKey = process.env.REACT_APP_API_KEY;
const wsUrl = `wss://api.play.ai/v1/talk/${agentId}`;

const VoiceAIComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isResponding, setIsResponding] = useState(null);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // New state for connection status
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const timerRef = useRef(null);
  const accumulatedAudioData = useRef('');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        headers: {
          Authorization: apiKey,
          'X-USER-ID': process.env.REACT_APP_USER_ID,
          accept: 'application/json',
        },
      };

      try {
        const response = await axios.get(`/api/v1/agents/${agentId}`, options);
        setProfileDetails(response.data);
      } catch (error) {
        console.error('Axios error:', error);
        setError('Failed to fetch profile details.');
      }
    };

    fetchData();
  }, []);

  const handleAudioStream = useCallback(async () => {
    const base64Data = accumulatedAudioData.current;
    const blob = base64toBlob(base64Data);
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    accumulatedAudioData.current = ''; // Clear accumulated data
    setIsResponding(false);
    setIsListening(true);
  }, []);

  const connectWebSocket = useCallback(() => {
    if (connectionStatus === 'disconnected') {
      setConnectionStatus('connecting'); // Update status to 'connecting'
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected'); // Update status to 'connected'
        wsRef.current.send(JSON.stringify({ type: 'setup', apiKey: apiKey, outputFormat: 'mp3', outputSampleRate: 24000 }));
        console.log('Setup message sent');
      };

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'voiceActivityStart':
            console.log('Voice activity started');
            setIsListening(true);
            setIsResponding(false);
            break;
          case 'audioStream':
            setIsListening(false);
            setIsResponding(true);
            accumulatedAudioData.current += message.data;
            break;
          case 'voiceActivityEnd':
            console.log('Voice activity ended');
            setIsResponding(false);
            handleAudioStream();
            setIsListening(true);
            break;
          case 'error':
            console.error('Error from server:', message.message);
            setError(message.message);
            break;
          default:
            console.log('New message type:', message.type);
            break;
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket error occurred.');
        setConnectionStatus('disconnected'); // Revert status on error
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed');
        setConnectionStatus('disconnected'); // Revert status on close
      };
    }
  }, [connectionStatus, handleAudioStream]);

  const handleStartRecording = async () => {
    connectWebSocket(); // Connect WebSocket when starting recording

    if (connectionStatus !== 'connected') {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (event) => {
        const base64Data = await blobToBase64(event.data);
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'audioIn', data: base64Data }));
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      window.location.reload();
    }
  };

  const base64toBlob = (base64Data) => {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'audio/mpeg' });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
    <div className='mainVoiceAssistant'>
    <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
     <div className={`storageMainContainer  ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='voice-ai-container' >

        <div className="voice-ai-controls">
          {!isRecording && (
            <div className="voice-ai-controls-container">
              <button
                className={`voice-ai-talk-button ${isRecording ? 'voice-ai-recording' : ''}`}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={connectionStatus !== 'connected'}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
              <button
                onClick={connectWebSocket}
                disabled={connectionStatus !== 'disconnected' && connectionStatus !== 'connecting'}
                className={`connect-button ${connectionStatus}`}
              >
                {connectionStatus === 'disconnected' && 'Connect to talk'}
                {connectionStatus === 'connecting' && 'Connecting...'}
                {connectionStatus === 'connected' && 'Connected'}
              </button>
            </div>
          )}

          {isRecording && (
            <div className="voice-ai-popup">
              <div className="voice-ai-popup-content">
                <div className="voice-ai-popup-header">
                  <div>
                    <p className="voice-ai-profile-name">{profileDetails.displayName}</p>
                    <p className="voice-ai-profile-greeting">
                      Hello, I am the AI Assistant of {profileDetails.displayName}
                    </p>
                  </div>
                  <div className="circle-animation">
                    <img
                      className={`voice-ai-profile-image ${isPlaying ? 'blink-animation' : ''}`}
                      src={profileDetails.avatarPhotoUrl}
                      alt="Profile"
                    />
                  </div>
                  {isListening && <div className="voice-ai-status">Listening...</div>}
                  {isResponding && <div className="voice-ai-status">Responding...</div>}
                  <div>{formatTime(recordingTime)}</div>
                </div>
                <AudioPlayer
                  autoPlay
                  ref={audioPlayerRef}
                  src={audioURL}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  style={{ display: 'none' }}
                />
                
                <button className="voice-ai-cancel-button" onClick={handleStopRecording}>
                  close
                </button>
              </div>
            </div>
          )}

          {error && <div className="voice-ai-error-message">{error}</div>}
        </div>
    
      </div>
      </div>
      </div>
    </>
  );
};

export default VoiceAIComponent;
*/
import React, { useState, useRef, useEffect, useCallback } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';

import 'react-h5-audio-player/lib/styles.css';
import "./voiceAiComponent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../ThemeContext";

const agentId = process.env.REACT_APP_AGENT_ID;
const apiKey = process.env.REACT_APP_API_KEY;
const wsUrl = `wss://api.play.ai/v1/talk/${agentId}`;

const VoiceAIComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isResponding, setIsResponding] = useState(null);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // New state for connection status
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const timerRef = useRef(null);
  const accumulatedAudioData = useRef('');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        headers: {
          Authorization: apiKey,
          'X-USER-ID': process.env.REACT_APP_USER_ID,
          accept: 'application/json',
        },
      };

      try {
        const response = await axios.get(`/api/v1/agents/${agentId}`, options);
        const { data } = response

        setProfileDetails(data);
        console.log(profileDetails)
      } catch (error) {
        console.error('Axios error:', error);
        setError('Failed to fetch profile details.');
      }
    };

    fetchData();
  }, []);
  console.log(profileDetails)

  const handleAudioStream = useCallback(async () => {
    const base64Data = accumulatedAudioData.current;
    const blob = base64toBlob(base64Data);
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    accumulatedAudioData.current = ''; // Clear accumulated data
    setIsResponding(false);
    setIsListening(true);
  }, []);

  const connectWebSocket = useCallback(() => {
    if (connectionStatus === 'disconnected') {
      setConnectionStatus('connecting'); // Update status to 'connecting'
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected'); // Update status to 'connected'
        wsRef.current.send(JSON.stringify({ type: 'setup', apiKey: apiKey, outputFormat: 'mp3', outputSampleRate: 24000 }));
        console.log('Setup message sent');
      };

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'voiceActivityStart':
            console.log('Voice activity started');
            setIsListening(true);
            setIsResponding(false);
            break;
          case 'audioStream':
            setIsListening(false);
            setIsResponding(true);
            accumulatedAudioData.current += message.data;
            break;
          case 'voiceActivityEnd':
            console.log('Voice activity ended');
            setIsResponding(false);
            handleAudioStream();
            setIsListening(true);
            break;
          case 'error':
            console.error('Error from server:', message.message);
            setError(message.message);
            break;
          default:
            console.log('New message type:', message.type);
            break;
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket error occurred.');
        setConnectionStatus('disconnected'); // Revert status on error
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed');
        setConnectionStatus('disconnected'); // Revert status on close
      };
    }
  }, [connectionStatus, handleAudioStream]);

  const handleStartRecording = async () => {
    if (connectionStatus === 'disconnected') {
      connectWebSocket(); // Connect WebSocket when starting recording
    }

    if (connectionStatus !== 'connected') {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (event) => {
        const base64Data = await blobToBase64(event.data);
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'audioIn', data: base64Data }));
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      window.location.reload();
    }
  };

  const base64toBlob = (base64Data) => {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'audio/mpeg' });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className='mainVoiceAssistant'>
        <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div id='aico' className={`storageMainContainer ${isDarkMode ? 'dark-mode dark-mode1' : 'light-mode dark-mode1'}`}>
          <h1 className='headTitle'>
            Aishaala - AI Assistant For Teachers & Students
          </h1>
          <div id="voiceaicont" className='voice-ai-container'>
            <div id="voiceaicontrol" className="voice-ai-controls">
              {!isRecording &&
                <div className="voice-ai-controls-container">
                  <button
                    className={`voice-ai-talk-button ${isRecording ? 'voice-ai-recording' : ''}`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    disabled={connectionStatus === 'connecting'}
                  >
                    {/*<FontAwesomeIcon icon={faMicrophone} />*/}

                    <img src='https://res.cloudinary.com/dcwxu3d5g/image/upload/v1721233451/Task%20internship/bot_icon_1_-removebg-preview_tri3da.png' alt="roboAi" className='roboaiicon' />
                  </button>
                  <div className={`connection-status ${connectionStatus}`}>
                    <br />
                    {connectionStatus === 'disconnected' && 'Click to connect'}
                    {connectionStatus === 'connecting' && 'Connecting...'}

                    <br />
                    {connectionStatus === "connected" && " click to talk"}

                  </div>
                </div>}
              {isRecording && (
                <div className="voice-ai-popup">
                  <div className="voice-ai-popup-content">
                    <div className="voice-ai-popup-header">
                      <div>
                        <p className="voice-ai-profile-name">{/*profileDetails.displayName*/}Leg Ai</p>
                        <p className="voice-ai-profile-greeting">
                          Hello, I am the AI Assistant of {/*profileDetails.displayName*/}Leg Ai
                        </p>
                      </div>
                      <div className="circle-animation">
                        <img
                          className={`voice-ai-profile-image ${isPlaying ? 'blink-animation' : ''}`}
                          src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1721230445/Task%20internship/download12345_akcopb.jpg"
                          alt="Profile"
                        />
                      </div>
                      {isListening && <div className="voice-ai-status">Listening...</div>}
                      {isResponding && <div className="voice-ai-status">Responding...</div>}
                      <div>{formatTime(recordingTime)}</div>
                    </div>
                    <AudioPlayer
                      autoPlay
                      ref={audioPlayerRef}
                      src={audioURL}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      style={{ display: 'none' }}
                    />
                    <button className="voice-ai-cancel-button" onClick={handleStopRecording}>
                      close
                    </button>
                  </div>
                </div>
              )}
              {error && <div className="voice-ai-error-message">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceAIComponent;
