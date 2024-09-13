import React, { useState } from 'react';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import "./Profiles.css"
import { useTheme } from "../ThemeContext";

const Profiles =()=>{
    const { isDarkMode, toggleTheme } = useTheme();

    return(
        <div className={`profileCont ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <h1 className='profilesupdatedhead'>Profiles are updated soon</h1>
        </div>
    )
    
}

export default Profiles