import './ClientDataset.css';
import { useTheme } from "../ThemeContext";
import ClientTableView from '../ClientTableView/ClientTableView';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import ClientSidebar from '../ClientSidebar/ClientSidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';

function ClientDataset() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        remarks: ''
    });
    const [uploadingFile, setUploadingFile] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDeleting, setIsDeleting] = React.useState({});
    const [successMessage, setSuccessMessage] = React.useState("");

    useEffect(() => {


        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = Cookies.get('token'); // Get the token from cookies
            const response = await axios.get('https://legai.onrender.com/clients', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in headers
                }
            });
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleDelete = async (id) => {

        setIsDeleting(prev => ({ ...prev, [id]: true }));
        try {
            const token = Cookies.get('token'); // Get the token from cookies
            await axios.delete(`https://legai.onrender.com/clients/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in headers
                }
            });
            setSuccessMessage("Client deleted successfully!");
            fetchClients();
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Error deleting client:", error);
        } finally {
            setIsDeleting(prev => ({ ...prev, [id]: false }));
        }
    };

    const handleSubmit = async (e, closePopup) => {
        e.preventDefault();
        setUploadingFile(true);
        setError(null);
        setSuccess(null);

        try {
            const token = Cookies.get('token'); // Get the token from cookies
            const response = await axios.post('https://legai.onrender.com/clients', formData, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in headers
                }
            });
            console.log('Client created:', response.data);
            setSuccess('Client created successfully!');
            setShowSuccessMessage(true);
            setFormData({
                name: '',
                mobileNumber: '',
                email: '',
                remarks: ''
            });

            // Refresh client list
            

            closePopup();
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // Success message will disappear after 3 seconds
        } catch (error) {
            setError(error.response ? error.response.data.error : 'An error occurred');
        } finally {
            setUploadingFile(false);
            fetchClients();
        }
    };

    return (
        <div className={`clientdatasetContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <ClientSidebar
                className="mainSide"
                isDarkMode={isDarkMode}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                uploadingFile={uploadingFile}
                error={error}
                success={success}
            />

            <div className='tablesRows'>
                <div className='clientFolderAdd'>
                    <h1 className='clientHeader'>Clients</h1>
                    <Popup
                        className="popupclass"
                        trigger={
                            <button id="createfolderbtn" className={`buttonClient ${isAnimating ? 'animate' : ''}`}>
                                Create Client <FontAwesomeIcon className='pencilIcon' icon={faPlus} />
                            </button>
                        }
                        modal>
                        {close => (
                            <div id='modalClient' className="modal modalContainer2">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="headerclient headingCreateFolder">Create a Client</div>
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
                </div>
                {showSuccessMessage && <div className="floating-success-message">{success}</div>}
                <ClientTableView successMessage={successMessage} isDeleting={isDeleting} handleDelete={handleDelete} clients={clients} />
    
            </div>
        </div>
    );
}

export default ClientDataset;
