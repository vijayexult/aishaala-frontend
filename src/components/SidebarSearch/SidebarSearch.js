import React from 'react';
import './SidebarSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFileContract, faFileSignature, faFileUpload, faFileImage } from '@fortawesome/free-solid-svg-icons';

function SidebarSearch({ isDarkMode }) {
  return (
    <div className={`sidebarsearch ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="activate-pro">Legal Ai Assistant</button>
      <hr className='hrline'/>
      <div className="docs-section">
        <h2>Docs</h2>
        <ul>
          <li className='doclist'>
            <span>Agreement summary</span>
            <FontAwesomeIcon icon={faFileAlt} />
          </li>
          <li className='doclist'>
            <span>Compare agreements</span>
            <FontAwesomeIcon icon={faFileContract} />
          </li>
          <li className='doclist'>
            <span>Create an agreement</span>
            <FontAwesomeIcon icon={faFileSignature} />
          </li>
          <li className='doclist'>
            <span>Document translation</span>
            <FontAwesomeIcon icon={faFileUpload} />
          </li>
          <li className='doclist'>
            <span>Image to text</span>
            <FontAwesomeIcon icon={faFileImage} />
          </li>
        </ul>
      </div>
      <div className="history-section">
        <h2>History</h2>
        <p>History is empty. Let's start your first chat!</p>
      </div>
    </div>
  );
}

export default SidebarSearch;