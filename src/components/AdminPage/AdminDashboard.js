import React from 'react';
import './AdminDashboard.css';

const businesses = [
    {
        name: "Bihar Civil Academy",
        phone: "9972968390",
        admin: "BCA Admin",
        email: "vijay.exult@gmail.com",
        location: "Mukherjee Nagar Delhi",
    },
    {
        name: "Wizzmedia Buzz",
        phone: "9972968390",
        admin: "Vijay Kumar",
        email: "vijay.wiz@gmail.com",
        location: "Delhi",
    },
    {
        name: "Amazon",
        phone: "9899786348",
        admin: "Charan",
        email: "charanpraveen9989@gmail.com",
        location: "22-12-10 Bhimalingam Vari Street, Kothapet Tenali",
    },
    {
        name: "Threadz",
        phone: "8309370811",
        admin: "Mahesh",
        email: "katakamkumar0@gmail.com",
        location: "Fashion Avenue, Mumbai, Maharashtra",
    },
    {
        name: "Soles Mates",
        phone: "9989786348",
        admin: "Charan Praveen",
        email: "charanpraveen@gmail.com",
        location: "Kothapet",
    },
];

const AdminDashboard = () => {
    return (
        <div className="mainnAdmin">
            <header className="navAdmin">
                <div className='logocontainer'>
                    <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719660210/chintu/Legai_1_c1olwj.png" className="adminlogo" />

                    <h1 className='logotext'>Legalee Ai</h1>

                </div>

                <p className="user-info">Vijay Kumar</p>
            </header>
            <div className="container">
                <nav className="sidebarAdmin">
                    <ul>
                        <li>Business</li>
                        <li>owner name</li>
                        <li>BDA</li>
                        <li>Settings</li>
                        <li>Account</li>
                    </ul>
                </nav>
                <main className="business-list">
                    {businesses.map((business, index) => (
                        <div className="business-card" key={index}>
                            <div className="business-info">
                                <h2>{business.name}</h2>
                                <div className='phonedetails'>
                                    <pre>{business.phone}{","} </pre>
                                    <pre>{business.admin}{","} </pre>
                                    <pre>{business.email}</pre>
                                </div>

                                <p><span role="img" aria-label="location">📍</span> {business.location}</p>
                            </div>
                            <button className="login-button">Login</button>
                        </div>
                    ))}
                    <button className="add-button">+</button>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;