import "./ClientTableView.css";
import "../StorageMainContent/StorageMainContent.css";
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import axios from "axios";

const ClientTableView = ({ isDeleting,successMessage,clients,handleDelete }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    

    return (
        <div className="tableSearchTable tablesearchVw">
            <div className="searchrow">
                <div className="searchCon">
                    <FontAwesomeIcon className="searchicon" icon={faMagnifyingGlass} />
                    <input className="searchEle"
                        type="search"
                        id="searchElement"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {successMessage && <div className="floating-message">{successMessage}</div>}

            <div id="tablecontainerclient" className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th id="emilll" className="emailll">Email</th>
                            <th>Mobile Number</th>
                            <th>Remarks</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client._id}>
                                <td>{client.sNo}</td>
                                <td>{client.name}</td>
                                <td >{client.email}</td>
                                <td>{client.mobileNumber}</td>
                                <td>{client.remarks}</td>
                                <td>{client.createdAt}</td> 
                                <td>
                                    <Link to={`/clientprofile/${client._id}`}>
                                    <button className="btnIcon btnView">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    </Link>
                                    
                                    <button
                                        className="btnIcon btnDelete"
                                        onClick={() => handleDelete(client._id)}
                                    >
                                        {isDeleting[client._id] ? <ClipLoader size={16} color="#ffffff" /> : <FontAwesomeIcon icon={faTrash} />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientTableView;
