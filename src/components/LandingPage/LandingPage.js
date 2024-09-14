
import Cookies from 'js-cookie';

import Loader from 'react-loader-spinner'
import { ColorRing, Circles, BallTriangle } from 'react-loader-spinner'
import { RotatingLines } from 'react-loader-spinner';
import { faDiscord, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ParticlesComponent from '../particles';
import { useNavigate, Link } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import './LandingPage.css';
import { useContext, useEffect, useState } from 'react';


import { MdMenu } from "react-icons/md";

import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import Lottie from "lottie-react";
import Mic from './Mic.json';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

//animationimport

import AOS from 'aos';
import 'aos/dist/aos.css';
import BoxComponent from './boxComponent';

import Logo from "./assets/image1.png"
import Logo2 from './assets/image2.png'
import Logo3 from './assets/image3.png'
import Logo4 from './assets/image4.png'
import Logo5 from './assets/image5.png'
import Logo6 from './assets/image6.png'
import TradeMark from './assets/img10.png'

import VideoBoxComponent from './Videobox';

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
    const navigate = useNavigate();
    const [authUsers, setAuthUsers] = useState(null);
    const [authSubadmins, setAuthSubadmins] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const currentYear = new Date().getFullYear();
    // const [category,setCategory]=useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [signInModal, setSignInModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    //register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // const videoRef=useRef();
    const footerItems = [
        { header: " Aishaala ", subHeaders: [{ title: "About Us", path: "/about" }] },
        { header: "Office", subHeaders: [{ title: "Head Office", path: "" }, { title: "Branch Office", path: "" },] },
        { header: "Quick Links", subHeaders: [{ title: "Blog", path: "/blog" },  { title: "Careers", path: "" }] },
        { header: "Legal Stuff", subHeaders: [{ title: "Privacy Policy", path: "./pdf/pp.pdf" }, { title: "Terms of Service", path: "/terms-conditions" }, { title: "Refunds", path: "/refunds" }, { title: "Disclaimer", path: "/disclaimer" },{ title: "Admin", path: "/admindashboard" },] },
    ]

    const testimonials = [
        {
            name: "Birbal Jha",
            designation: "English Trainer",
            testimonial: "Aishaala is a game-changer in education. With its AI voice assistant, the teacher-to-student ratio effectively becomes 1:1, providing a personalized learning experience."
        },
        {
            name: "Indresh Rao",
            designation: "UPSC Faculty",
            testimonial: "Incorporating Aishaala into our UPSC coaching has been a game-changer. The AI assistant's ability to provide personalized guidance and manage vast study materials efficiently has made our preparation process far more organized and effective."
        },
        {
            name: "Samarjeet Tripathi",
            designation: "UPSC Aspirant",
            testimonial: "Navigating the complexities of UPSC preparation was daunting until I started using Aishaala. The AI’s support in managing study resources and delivering prompt feedback has made my study sessions more productive and less stressful."
        },
        {
            name: "Shashank Sharma",
            designation: "District Judge",
            testimonial: "The impact of Aishaala on our legal education has been profound. Its advanced AI features offer seamless access to essential legal knowledge and provide tailored support, significantly enhancing the learning experience for both educators and students."
        },
        {
            name: "Priya Singh",
            designation: "Author, Spiritual Mentor",
            testimonial: "Aishaala has brought a new dimension to my spiritual teachings. The AI’s ability to make lessons interactive and personalized aligns perfectly with my approach, offering deeper insights and a richer experience for my students."
        },
        {
            name: "Devendra Singh Bahadur",
            designation: "Educationist, Technology Leader, MNC",
            testimonial: "As someone deeply involved in education and technology, I’m impressed by how Aishaala integrates seamlessly into the learning process."
        }
    ];
    




    const h3Style = {
        fontSize: '1.31em', /* Typical font-size for h3 */
        fontWeight: 'bold', /* h3 is typically bold */
        marginTop: '1em', /* Top margin for spacing */
        marginBottom: '1em', /* Bottom margin for spacing */
        lineHeight: '1.25', /* Adjust line-height for readability */
        cursor: 'pointer', /* Add cursor pointer to indicate clickability */
    };

    useEffect(() => {
        AOS.init({
            duration: 1200, // Duration of animations
            easing: 'ease-in-out', // Easing function
            // Whether animation should happen only once
            offset: 100, // Offset from the bottom of the viewport
        });
    }, []);


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
                    setTimeout(() => setMessage(""), 4000);
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
        // setLoading(true)
        console.log(credentialResponse.credential);
        const token = credentialResponse.credential
        const decoded = jwtDecode(token);
        console.log(decoded)
        localStorage.setItem("profile", JSON.stringify(decoded))
        const { email, name } = decoded
        console.log(email, name, "aaaa")

        try {


            // const response = await axios.post("https://legai.onrender.com/login", {
            //     "username": email,
            //     "password": name,
            // });
            // console.log(response)
            Cookies.set("token", token, { expires: 7 });
            // setMessage("User logged in successfully!");
            // toast.success("User logged in successfully!")


            navigate("/voiceAi");

        } catch (error) {
            toast.error(`Error: ${error.response?.data?.error || "Network Error"}`);

            setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
            setTimeout(() => setMessage(""), 4000);
        } finally {
            setLoading(false);
            setUsername("")
            setPassword("")
        }
    }

    const navigateadmin = (path) => {
        navigate("/admindashboard")
    }


    useEffect(() => {
        AOS.init({
            duration: 1200, // Duration of animations
            easing: 'ease-in', // Easing function
            // Whether animation should happen only once
            // Offset from the bottom of the viewport
        });
    }, []);

    const duplicatetestimonals = [...testimonials, ...testimonials, ...testimonials, ...testimonials]


    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);




    const [isSigninPopupOpen, setSigninPopupOpen] = useState(false); // New state for sign-in popup



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





    return (
        <>
            <div className="landing-container" >
            {/* <ParticlesComponent id="particles" />  */}
                {<div className="navbar-landing">
                    <div className='navbar-left'>
                        <p id="legallehead" onClick={() => { navigate('/') }} className='legaliHead'>Aishaala</p>
                        <p onClick={() => { navigate('/') }}>About</p>
                        <p>Students</p>
                        <p>Teachers</p>
                        <p onClick={() => { setIsPlaying(p => !p) }}>Business</p>
                    </div>
                    <div id="navbarright" className='navbar-right'>
                        <p className='help'>Help</p>
                        <button className='landing-signup-btn' onClick={() => setSigninPopupOpen(true)}>Sign In</button>
                    </div>
                </div>}
                <div className="navbar-landing-mobile">
                    <div className='navbar-left'>
                        <h3 onClick={() => { navigate('/voiceAi') }}>Aishaala</h3>
                    </div>
                    <div className='navbar-right'>
                        {/* <p>Help</p> */}
                        <button className='landing-signup-btn' onClick={() => { setShowModal(true) }}>Sign Up</button>
                        {showDrawer ? <ImCross onClick={() => { setShowDrawer(false) }} className='navbar-mobile-menu-icon' /> : <MdMenu onClick={() => { setShowDrawer(true) }} className='navbar-mobile-menu-icon' />}
                    </div>
                </div>

                <div className="hero-section">
                    <h1>AI Assistant for Teachers and Students</h1>
                    <p>
                        experience the future of education with Aishaala Conversational AI,<br />a personalized assistant designed to enhance learning for teachers and Students  </p>
                    <div className="microphone-wrapper">
                    <div className="mic-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Lottie animationData={Mic} style={{ height: 150, width: 150 }} />
                            
                            </div>
                        <p>Click to Talk</p>
                    </div>
                    <div className='try-get-buttons'>
                        <button className='try-button' onClick={handleTryForFreeClick}> Try For Free</button>

                        <button className='Get-in-button' onClick={handleGetInTouchClick}> Get in Touch{">"}</button>
                    </div>
                    <button className="viewdemo-button" onClick={handleViewDemoClick}>View Demo</button>


                </div>
                {/* page1 */}
                <BoxComponent content={content2} onclick={handleTryForFreeClick} onclicked={() => setSigninPopupOpen(true)}/>
                <BoxComponent content={content3} onclick={handleTryForFreeClick} onclicked={() => setSigninPopupOpen(true)}/>
                <BoxComponent content={content4} onclick={handleTryForFreeClick} onclicked={() => setSigninPopupOpen(true)}/>
                <BoxComponent content={content5} onclick={handleTryForFreeClick} onclicked={() => setSigninPopupOpen(true)}/>
                <BoxComponent content={content6} onclick={handleTryForFreeClick} onclicked={() => setSigninPopupOpen(true)}/>

                <h1 className='testimonalsHead'>Testimonals</h1>
                <div className="carousel-container">
                    <div className="carousel-content">
                        {duplicatetestimonals.map((testimonial, index) => (
                            <div className="card-testimonal" key={index}>
                                <h3 className='name-twstimonal'>{testimonial.name}</h3>
                                <p className="designation">{testimonial.designation}</p>
                                <p className="testimonial">{testimonial.testimonial}</p>
                            </div>
                        ))}
                        {/* Clone the content for the infinite scroll effect */}
                        {testimonials.map((testimonial, index) => (
                            <div className="card-testimonal" key={index + testimonials.length}>
                                <h3 className='name-twstimonal'>{testimonial.name}</h3>
                                <p className="designation">{testimonial.designation}</p>
                                <p className="testimonial">{testimonial.testimonial}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='landing-footer block'>
                    <div className='footer-items'>
                        {footerItems.length > 0 &&
                            footerItems.map((data, index) => (
                                <div className='footer-col'>
                                    <h3 className='headerFooter'>{data.header}</h3>
                                    <div className='footer-col-item'>
                                        {data.subHeaders.map((dat, inde) => (
                                            <p onClick={() => { dat.title !== "" ? navigate(dat.path) : setAddress("") }}>{dat.title}</p>
                                        ))}
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    <hr className='footer-line' />
                    <div className='footer-bottom'>

                        <p className="copyright">
                            <p>&copy; {currentYear} Aishalaa. All Rights Reserved.</p>
                        </p>
                    </div>

                </div>
            </div>

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

                        {loading ? (
                            <div className="loader-container">
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
                onSuccess={async (credentialResponse) => {
                  Cookies.set("token",credentialResponse.credential);
                  navigate("/voiceAi");
                }
              }
                onError={() => {
                  console.log("Login Failed");
                }}
              />
                        )}
                        {message && <p className="floating-message-login">{message}</p>}
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
                onSuccess={async (credentialResponse) => {
                    console.log(credentialResponse.credential);
                  Cookies.set("token",credentialResponse.credential);
                  navigate("/voiceAi");
                }
              }
                onError={() => {
                  console.log("Login Failed");
                }}
              />

                        )}
                        {message && <p className="floating-messge-login">{message}</p>}
                    </div>

                </div>
            )}
            {
                showDrawer &&
                <div className={`drawer-container ${showDrawer ? 'show-drawer' : ''}`}>
                    <div className='drawer-items'>
                        <p>Home</p>
                        <p>About</p>
                        <p onClick={() => { setShowDrawer(false); setIsPlaying(p => !p) }}>Business</p>

                    </div>
                </div>
            }
        </>
    )
}

export default LandingPage;
