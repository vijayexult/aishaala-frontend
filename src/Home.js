import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';

import SideNavigationBar from './components/SideNavigationBar/SideNavigationBar';
import './Home.css';
import Chatbot from './components/Chatbot/Chatbot';

import { useTheme } from './components/ThemeContext';

function Home() {
  const { isDarkMode, toggleTheme } = useTheme();


  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
        <div className="main">  
          <Chatbot isDarkMode={isDarkMode}/>
        </div>
    </div>
  );
}

export default Home;