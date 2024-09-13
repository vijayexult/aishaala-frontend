import React, { useState } from 'react';
import './sidebardataset.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import { ClipLoader } from 'react-spinners';
function SidebarDataset({ isDarkMode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);




  return (
    <div id="sidebardatset" className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='LegAiLOGOName'>Aishaala</h1>
      <button className="activate-pro">AI Assistant For Teachers & Students</button>
      <hr className='linehor' />

      <div className="pinned-chats">
        <h1 className='knowledgeSidebar'>Knowledge</h1>

        <Popup
          className="popupclass modaldataset"
          trigger={<button id="createfolderbtn" className={`new-chat ${isAnimating ? 'animate' : ''}`}>Create Folder
            <FontAwesomeIcon className='pencilIcon' icon={faPlus} />
          </button>}
          modal>
          {close => (
            <div className="modaldataset  modalContainer">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header headingCreateFolder">Create a Folder</div>
              <div className="contentdataset">
                <form className="formStyle" >
                  <input id="categoryinput" type="text" className="fileinput form-control" placeholder="Name the Folder" required />
                  <button className="btnCLassSubmitupload" type="submit">
                    {uploadingFile ? <ClipLoader size={16} color="#ffffff" /> : 'Create Folder'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </Popup>

        <h3 className='h3tag'>Folders</h3>
        <p>No Folders yet</p>
      </div>

    </div>

  );
}

export default SidebarDataset;