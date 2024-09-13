// src/components/LandingPage.js

import React, { useState } from 'react';
import BoxComponent from '../boxComponent';
import Logo from "../assets/image1.png"
import Logo2 from '../assets/image2.png'
import Logo3 from '../assets/image3.png'
import Logo4 from '../assets/image4.png'
import Logo5 from '../assets/image5.png'
import Logo6 from '../assets/image6.png'
import TradeMark from '../assets/img10.png'

import { RotatingLines } from 'react-loader-spinner';


import VideoBoxComponent from '../Videobox';

import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from 'react-router-dom';
import toast from "react-hot-toast";
import Cookies from 'js-cookie';


import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaChevronRight } from "react-icons/fa";
import "./Landpage.css"

const content = {
  button: 'Start Now',
  order: 'box-order-2',
  image: { src: Logo, alt: 'Logo' },
  heading: 'AI Assistant for Teachers and Students',
  paragraph: `Welcome to the future of education with Aishaala, the revolutionary AI voice assistant crafted to elevate the learning experience for both teachers and students. 
  `
};

const content2 = {
  button: 'Get Started',
  order: 'box-order-1',
  image: { src: Logo, alt: 'Logo2' },
  heading: 'Intelligent Teaching Support',
  paragraph: `Aishaala offers real-time voice and chat assistance for teachers, simplifying lesson planning and classroom management. 
  With its personalized training and multilingual capabilities, Aishaala customizes lesson plans to fit unique teaching needs and supports various languages, 
  making education more accessible and effective.`
};

const content3 = {
  button: 'Get Started',
  order: 'box-order-2',
  image: { src: Logo2, alt: 'Logo3' },
  heading: 'Personalized Student Assistance',
  paragraph: `Enhance learning with Aishaala’s student-focused features. Our AI provides tailored help and a revision mode that adapts to each student’s learning style. 
  Interactive Q&A and writing assistance empower students with instant answers and valuable feedback, making study sessions more productive and engaging.`
};

const content4 = {
  button: 'Get Started',
  order: 'box-order-1', // Adjust this if you want a different order
  image: { src: Logo3, alt: 'Logo4' }, // Replace with the actual image source
  heading: 'Effortless Navigation of Knowledge',
  paragraph: `Aishaala streamlines access to a vast array of educational resources. Students can use voice commands to easily navigate through videos, books, notes, and test papers. 
  This capability enables quick location of relevant content and efficient management of diverse study materials.`
};

const content5 = {
  button: 'Get Started',
  order: 'box-order-2', // Adjust this if you want a different order
  image: { src: Logo5, alt: 'Logo5' }, // Replace with the actual image source
  heading: 'Customized Knowledge Integration',
  paragraph: `Integrate specialized knowledge seamlessly with Aishaala. Our AI assistant is fine-tuned to align with specific curricula and institutional needs, 
  ensuring that the content delivered is relevant and tailored to the educational focus of your institution.`
};

const content6 = {
  button: 'Get Started',
  order: 'box-order-1', // Adjust this if you want a different order
  image: { src: Logo6, alt: 'Logo6' }, // Replace with the actual image source
  heading: 'Engaging Adaptive Testing',
  paragraph: `Revolutionize test preparation with Aishaala’s adaptive testing feature. The AI provides dynamic quizzes and practice sessions that adjust in real-time to students’ performance. 
  Gamified elements make learning enjoyable while effectively assessing and enhancing student capabilities.`
};





const LandingPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSigninPopupOpen, setSigninPopupOpen] = useState(false); // New state for sign-in popup
  const navigate = useNavigate();


  const handleViewDemoClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };


  {/*signup popup states*/ }
  const handleTryForFreeClick = () => {
    setSignupPopupOpen(true);
  };

  const handleCloseSignupPopup = () => {
    setSignupPopupOpen(false);
  }

  {/*sign in popup states*/ }
  const handleSigninClick = () => {
    setSigninPopupOpen(true);
  };

  const handleCloseSigninPopup = () => {
    setSigninPopupOpen(false);
  };

  const [isGetInTouchPopupOpen, setGetInTouchPopupOpen] = useState(false);

  const handleGetInTouchClick = () => {
    setGetInTouchPopupOpen(true);
  };

  const handleCloseGetInTouchPopup = () => {
    setGetInTouchPopupOpen(false);
  };

  const successregister = async credentialResponse => {
    setLoading(true)
    console.log(credentialResponse.credential);
    const token = credentialResponse.credential
    const decoded = await jwtDecode(token);
    console.log(decoded)
    localStorage.setItem("profile", JSON.stringify(decoded))
    const { email, name } = decoded
    console.log(email, name, "aaaa")
    setUsername(email)
    setPassword(name)
    try {

      const response = await axios.post("https://legai.onrender.com/register", {
        "username": email,
        "password": name,
      });
      setMessage(response.data.message);
      toast.success(response.data && response.data.message);
      if (response.data.message == "User registered successfully") {
        try {

          const response = await axios.post("https://legai.onrender.com/login", {
            "username": email,
            "password": name,
          });
          console.log(response)
          Cookies.set("token", response.data.token, { expires: 7 });
          setMessage("User logged in successfully!");
          navigate("/voiceAi");
        } catch (error) {
          toast.error(`Error: ${error.response?.data?.error || "Network Error"}`);
          setMessage(`Error: ${error.response?.data?.error || "Network Error"}`)
        } finally {
          setLoading(false);
          setUsername("")
          setPassword("")

        }
      }
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds

    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }


  const successlogin = async credentialResponse => {
    setLoading(true)
    console.log(credentialResponse.credential);
    const token = credentialResponse.credential
    const decoded = jwtDecode(token);
    console.log(decoded)
    localStorage.setItem("profile", JSON.stringify(decoded))
    const { email, name } = decoded
    console.log(email, name, "aaaa")

    try {


      const response = await axios.post("https://legai.onrender.com/login", {
        "username": email,
        "password": name,
      });
      console.log(response)
      Cookies.set("token", response.data.token, { expires: 7 });
      setMessage("User logged in successfully!");
      toast.success("User logged in successfully!")
      setTimeout(() => setMessage(""), 4000);
      navigate("/voiceAi");

    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || "Network Error"}`);
      setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
    } finally {
      setLoading(false);
      setUsername("")
      setPassword("")
    }
  }

  return (

    <div className='landingpage'>
      <Navbar className='navvv' bg="transparent" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
            Aishaala
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
              <Nav.Link as={Link} to="/students" className="nav-link-custom">Students</Nav.Link>
              <Nav.Link as={Link} to="/teachers" className="nav-link-custom">Teachers</Nav.Link>
            </Nav>
            <Nav className="d-flex align-items-center">
              <Nav.Link as={Link} to="/help" className="d-flex align-items-center btn-custom">
                <FontAwesomeIcon icon={faDiscord} style={{ color: '#25D366', fontSize: '21px', marginRight: '8px' }} />
                Help
              </Nav.Link>
              <button onClick={() => setSigninPopupOpen(true)} className="signup-button">
                Sign In
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/*voicebox*/}
      <div className="Voice-box-container">
        <h1 className="Voice-header"> AI Assistant for Teachers and Students</h1>
        <p className='Voice-paragraph'> Experience the future of education with Aishaala Conversational AI, <br />a personalized assistant designed to enhance learning for teachers and students.

        </p>
        <div class="mic">
          <i class="mic-icon"></i>
          <div class="mic-shadow"></div>
          <button className='give-me-try'> Click to Talk</button>
        </div>

        <div className='try-get-buttons'>
          <button className='try-button' onClick={handleTryForFreeClick}> Try For Free</button>

          <button className='Get-in-button' onClick={handleGetInTouchClick}> Get in Touch{">"}</button>
        </div>
        <button className="viewdemo-button" onClick={handleViewDemoClick}>View Demo</button>


      </div>
      {/* <VideoBoxComponent content={content} /> */}




      {/*<VideoBoxComponent content={content} />*/}
      <BoxComponent content={content2} />
      <BoxComponent content={content3} />
      <BoxComponent content={content4} />
      <BoxComponent content={content5} />
      <BoxComponent content={content6} />
      <footer className="footer-section">
        <h1 className='heading-footer'> Aishaala <img className='tradmark' src={TradeMark} /> <br /> <span className='heading-span'>Powered by Mobishaala.com</span></h1>

        <div className="footer-container">

          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><a href="#office">Office</a></li>
              <li><a href="#head-office">Head Office</a></li>
              <li><a href="#branch-office">Branch Office</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#admin">Admin</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal Stuff</h3>
            <ul>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
              <li><a href="#refunds">Refunds</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Aishalaa. All Rights Reserved.</p>
        </div>
      </footer>

      {/*popup demo video*/}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup-button" onClick={handleClosePopup}>
              &times;
            </button>
            <iframe

              className='responsive-iframe'
              style={{ border: 0 }}
              scrolling="no"
              src="https://go.screenpal.com/player/cZjhcVV9cF3?width=100%&height=100%&ff=1&title=0"
              allowFullScreen
              title="Demo Video"
            ></iframe>
            <iframe
              class="responsive-small-iframe"
              width="100%"
              height="100%"
              style={{ border: 0 }}

              src="https://go.screenpal.com/player/cZjhcVV9cF3?width=100%&height=100%&ff=1&title=0"
              allowFullScreen
              title="Demo Video"
            ></iframe>
          </div>
        </div>
      )}
      {/* Signup Popup */}
      {isSignupPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content-signup">
            <button className="close-popup-button" onClick={handleCloseSignupPopup}>
              &times;
            </button>
            <h2>Sign Up for Aishaala</h2>
            <p>Join us and enhance your teaching and learning experience.</p>

            <GoogleLogin
              className="google-signup-container"
              onSuccess={successregister}
              onError={() => {
                console.log('Login Failed');
                alert("failed to login")
              }}
            />
          </div>
        </div>
      )}
      {/*get in touch popup*/}
      {isGetInTouchPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content-get-in-touch">
            <button className="close-popup-button" onClick={handleCloseGetInTouchPopup}>
              &times;
            </button>
            <h2>Get in Touch with Us</h2>
            <p>We would love to hear from you! Send us a message on WhatsApp.</p>
            <a
              href={`https://wa.me/+919972968390?text=Hello, I would like to get in touch regarding Aishaala.`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <button className="send-whatsapp-button">
                <FontAwesomeIcon className='whatsappicon' icon={faSquareWhatsapp} />   {"  "}WhatsApp
              </button>
            </a>
          </div>
        </div>
      )}

      {/* Sign In Popup */}
      {isSigninPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content-signin">

            <button className="close-popup-button" onClick={handleCloseSigninPopup}>
              &times;
            </button>
            <h2>Sign In to Aishaala</h2>
            <p>Welcome back! Please sign in to continue.</p>
            {loading ? (
              <div className="spinner-container">
                <RotatingLines
                  strokeColor="blue"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            ) : (
              <GoogleLogin
                className="google-signin-container"
                onSuccess={successlogin}
                onError={() => {
                  setLoading(false); // Stop loading on error
                  toast.error('Login Failed');
                }}
              />

            )}
            {message && <p className="floating-message-login">{message}</p>}
          </div>

        </div>
      )}


    </div>
  );
};

export default LandingPage;
