import React, { useState } from 'react';
import './ClientSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';

function ClientSidebar({ isDarkMode, handleSubmit, formData, handleChange, uploadingFile, error, success }) {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div id="sidebarClient" className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='LegAiLOGOName'>Aishaala</h1>
      <button className="activate-pro">AI Assistant For Teachers & Students</button>
      <hr className='linehor' />

      <div className="pinned-chats">
        <h1 className='knowledgeSidebar'>Clients</h1>

        <Popup
          className="popupclass"
          trigger={<button id="createfolderbtn" className={`new-chat ${isAnimating ? 'animate' : ''}`}>Add Client
            <FontAwesomeIcon className='pencilIcon' icon={faPlus} />
          </button>}
          modal>
          {close => (
            <div id='modalClient' className="modal modalContainer2">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="headerclient headingCreateFolder">Add Client</div>
              <div className="contentClient">
                <form className="formStyle" onSubmit={(e) => handleSubmit(e, close)}>
                  <input id="name" type="text" className="fileinput form-control" placeholder="Name of Client" required value={formData.name} onChange={handleChange} />
                  <input id="mobileNumber" type="number" className="fileinput form-control" placeholder="Mobile Number" required value={formData.mobileNumber} onChange={handleChange} />
                  <input id="email" type="email" className="fileinput form-control" placeholder="Email" required value={formData.email} onChange={handleChange} />
                  <input id="remarks" type="text" className="fileinput form-control" placeholder="Remarks" required value={formData.remarks} onChange={handleChange} />

                  <button className="btnCLassSubmitupload" type="submit">
                    {uploadingFile ? <ClipLoader size={16} color="#ffffff" /> : 'Create Client'}
                  </button>
                  {error && error == "Authentication required" ? "" : <p className="error">{error}</p>}

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

export default ClientSidebar;
