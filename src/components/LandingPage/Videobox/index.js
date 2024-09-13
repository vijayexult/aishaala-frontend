import React, { useState } from 'react';

import './index.css';

const VideoBoxComponent = ({ content }) => {
  const { image, heading, paragraph, order, button } = content;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleViewDemoClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="Box-container">
      <div className={`Box-content ${order}`}>
        <h1 className="Box-header">{heading}</h1>
        <p className='Box-Paragraph'>{paragraph}</p>
        <div className="landing-buttons">
          <button className="start-button">{button}</button>
          <button className="signin-button">Already have an Account? Sign in</button>
        </div>
      </div>

      <div className="Box-content">
        {!isPopupOpen && (
          <>
             <div className='image-box'>
            <img className="box-image" src={image.src} alt={image.alt} />
            </div>
            <button className="viewdemo-button" onClick={handleViewDemoClick}>View Demo</button>
          </>
        )}

        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup-button" onClick={handleClosePopup}>
                &times;
              </button>
              <iframe
               
                className='responsive-iframe'
                style={{ border: 0 }}
                scrolling="no"
                src="https://go.screenpal.com/player/cZjhcVV9cF3?width=100%&height=100%&ff=1&title=0"
                allowFullScreen
                title="Demo Video"
              ></iframe>
              <iframe
  class="responsive-small-iframe"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  
  src="https://go.screenpal.com/player/cZjhcVV9cF3?width=100%&height=100%&ff=1&title=0"
  allowFullScreen
  title="Demo Video"
></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBoxComponent;
