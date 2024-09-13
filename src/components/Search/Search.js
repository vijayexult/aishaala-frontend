import React, { useState } from 'react';
import SideNavigationBar from "../SideNavigationBar/SideNavigationBar"
import SidebarSearch from "../SidebarSearch/SidebarSearch"
import "./Search.css"
import { useTheme } from "../ThemeContext";

const Search = ()=>{
    const { isDarkMode, toggleTheme } = useTheme();

    
  return (
    <div className={`search-con ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <SidebarSearch isDarkMode={isDarkMode}/>
        <div className='contentinSearch'>
            <p>Search goes here</p>
        </div>
    </div>
  )
}
export default Search