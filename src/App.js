import React from 'react';
// import ParticlesBackground from './components/ParticlesBackground';
import ParticlesComponent from './components/particles';
import Lottie from "lottie-react";
import Mic from './Mic.json';
import './App.css';

function App() {
  return (
    <div className="app">
      <ParticlesComponent id="particles" /> 
      <header className="navbar">
        <div className="logo">Mobishaala</div>
        <nav className="nav-links">
          <a href="/">About</a>
          <a href="/">Students</a>
          <a href="/">Teachers</a>
        </nav>
        <div className="auth-buttons">
          <button className="help-btn">Help</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </header>

      <div className="content">
        <h1>AI Assistant for Teachers and Students</h1>
        <p>Experience the future of education with Aishaala Conversational AI, a personalized assistant designed to enhance learning for teachers and students.</p>
        
        <div className="mic-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Lottie animationData={Mic} style={{ height: 150, width: 150 }} />
          <p className='pp'>Click to Talk</p>
        </div>

        <div className="action-buttons">
          <button className="try-btn">Try For Free</button>
          <button className="contact-btn">Get in Touch</button>
        </div>
      </div>
    </div>
  );
}

export default App;
