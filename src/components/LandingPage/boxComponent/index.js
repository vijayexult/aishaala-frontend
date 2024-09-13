// src/components/BoxComponent.js

import React from 'react';
import './index.css'; // Ensure you have this CSS file for styling

const BoxComponent = ({ content }) => {
  const { image, heading, paragraph, order, button } = content;

  return (
    <div className="Box-container">
      <div className={`Box-content ${order}`}>
        <h1 className="Box-header">{heading}</h1>
        <p className='Box-Paragraph'>{paragraph}</p>
        <div className="landing-buttons">
          <button className=" start-now-btn start-button">{button}</button>
          <button className="signin-button">Already have an Account ? Sign in</button>
        </div>
      </div>
      <div className='Box-content'>
        <div className='image-box' >
          <img className='box-image' src={image.src} alt={image.alt} />
        </div>
      </div>

    </div>
  );
};

export default BoxComponent;
