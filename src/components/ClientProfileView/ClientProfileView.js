import "../ClientDataset/ClientDataset.css"
import "./ClientProfileView.css"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faTrash } from '@fortawesome/free-solid-svg-icons';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import ClientSidebar from '../ClientSidebar/ClientSidebar';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import Cookies from "js-cookie"
import { useTheme } from "../ThemeContext";

const ClientProfileView = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { id } = useParams(); // Get the client ID from the URL
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = Cookies.get('token'); // Get the token from cookies
                const response = await axios.get(`https://legai.onrender.com/clients/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in headers
                    }
                });
               
                setClient(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.error : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);


    console.log(client)

    return (
        <div className={`storageMainContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            {/*<div className="Storage-containerDatset">
                <ClientSidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            </div>*/}
            {loading ? (
                <div className="loaderContainer">
                    <ClipLoader size={50} />
                </div>) :
                <div className="containerClient">
                    <div className="headerClientset">
                        <div className="profile">
                            <div className="photo">Photo</div>
                            <div className="info">
                                <p>{client.name}</p>
                                <p>{client.mobileNumber}</p>
                                <p>{client.email}</p>
                            </div>
                        </div>
                        <div className="assistant">
                            <div className="icon"><FontAwesomeIcon icon={faMicrophone} /></div>
                            <p>Client Assistant</p>
                        </div>
                    </div>

                    <div className="content">
                        <div className="toolbar">
                            <div className="tool">Cases</div>
                            <div className="tool">Documents</div>
                            <div className="tool">Assistant</div>
                            <div className="tool">Conversation</div>
                            <div className="tool">Message</div>
                            <div className="tool">Billings</div>
                            <div className="tool">Profile</div>
                        </div>
                        <div className="editor">
                            <div className='publishDeleteContainer'>
                                <button className="publish">Publish</button>
                                <button className="delete"><FontAwesomeIcon className='icondelete' icon={faTrash} /></button>
                            </div>
                            <p>Draft saved 1 minute ago.</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ClientProfileView;
