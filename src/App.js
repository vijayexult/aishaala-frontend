import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Search from './components/Search/Search';
import { ThemeProvider } from "./components/ThemeContext";
import StorageComponent from './components/StorageComponent/StorageComponent';
import Profiles from './components/Profiles/Profiles';
import VoiceAIComponent from './components/VoiceAIComponent/VoiceAiComponent';
import './Home.css';
import ClientDataset from './components/ClientDataset/ClientDataset';
import ClientProfileView from './components/ClientProfileView/ClientProfileView';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from "./components/LandingPage/LandingPage"
import AdminDashboard from './components/AdminPage/AdminDashboard';
import Blog from './components/Blog/Blog';
import About from './components/About/About';

const App = () => {
    useEffect(() => {
        document.title = 'Aishaala';
    }, []);

    return (
        <div className="App">
            <GoogleOAuthProvider clientId="722452147364-o9b63kqli85r7l2tsndons0o3o6l8tg4.apps.googleusercontent.com">
                <BrowserRouter>
                    <ThemeProvider>
                        <Routes>
                            <Route exact path='/login' element={<Login />} /> 
                            <Route path='/' element={<LandingPage />} />
                            <Route path='/admindashboard' element={<AdminDashboard />} />
                            <Route path="/voiceAi" element={<ProtectedRoute element={VoiceAIComponent} />} />
                            <Route path="/chat" element={<ProtectedRoute element={Home} />} />
                            <Route path='/dataset' element={<ProtectedRoute element={StorageComponent} />} />
                            <Route path="/clientDataset" element={<ProtectedRoute element={ClientDataset} />} />
                            <Route path="/clientprofile/:id" element={<ProtectedRoute element={ClientProfileView} />} />
                            <Route path="/search" element={<ProtectedRoute element={Search} />} />
                            <Route path="/profiles" element={<ProtectedRoute element={Profiles} />} />
                            <Route  path="/blog"  Component={Blog} />
                            <Route  path="/about" Component={About} />
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </div>
    );
};

export default App;
