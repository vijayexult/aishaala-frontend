import React, { useState } from 'react';

import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import StorageMainContent from '../StorageMainContent/StorageMainContent';
import './StorageComponent.css';
import { useTheme } from "../ThemeContext";

function StorageComponent() {
  const { isDarkMode, toggleTheme } = useTheme();



  return (
    <div id="storagemaindatset" className={`storageMainContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="Storage-container">

        <StorageMainContent isDarkMode={isDarkMode} />
      </div>
    </div>

  );
}

export default StorageComponent;