import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faUsers, faRightFromBracket, faHeadset, faMoon, faMagnifyingGlass, faUser, faCloud, faComment, faGear, faUserShield, faUserTie } from '@fortawesome/free-solid-svg-icons';
import './SideNavigationBar.css';
import { IoLogOut } from 'react-icons/io5';
import {Tooltip} from "@nextui-org/react";
import { googleLogout } from '@react-oauth/google';
import Logo from "../LandingPage/assets/AishalaLogo.png";
import { FaGraduationCap } from "react-icons/fa";
import Cookies from 'js-cookie';
import { FaCloud } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineCreditScore } from "react-icons/md";
 // Tooltip import

function SideNavigationBar({ toggleTheme, isDarkMode }) {
  const location = useLocation();
  const darkmodeclass = isDarkMode ? "whiteimage" : "";

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // For settings toggle

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSettingsMenu = () => {
    setShowSettings(!showSettings);
  };

  const onLogOut = () => {
    googleLogout();
    Cookies.remove('token');
    navigate('/');
  }

  return (
    <>
      <div className={`side-navigation-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div>
          {isDarkMode ? (
            <div className='logoCont'>
              <img src={Logo} className={`logoimage ${isDarkMode}`} alt="Logo" />
            </div>
          ) : (
            <div className='logoCont'>
              <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719658345/chintu/Legai_yug6fi.png" className={`logoimage ${isDarkMode}`} alt="Logo" />
            </div>
          )}

          <ul className='tabiconsContainer'>
            {/* <Link className='linkele' to="/voiceAi" data-tip="Voice AI">
            <Tooltip className="custom-tool" content="Voice AI" placement="right">
              <li className={`litag ${location.pathname === "/" ? 'active' : ''}`}>
                <img src='https://res.cloudinary.com/dcwxu3d5g/image/upload/v1721306399/Task%20internship/bot_icon_tfcqux.png' alt="roboAiNav" className='roboaiiconNav'  />
              </li>
              </Tooltip>
            </Link> */}
            {location.pathname === '/chat'  ? (
              <Link className='linkele' to="/chat" data-tip="Chat">
              <Tooltip className="custom-tool" content="Chat AI" placement="right">
              <li className={`litag ${(location.pathname === '/chat') ? 'active' : ''}`}>
              <FaCommentDots style={{ fontSize: '28px' }}/>
              </li>
              </Tooltip>
            </Link>
            ) : (<Link className='linkele' to="/voiceAi" data-tip="Voice AI">
            <Tooltip className="custom-tool" content="Voice AI" placement="right">
              <li className={`litag ${location.pathname === "/" ? 'active' : ''}`}>
                <img src='https://res.cloudinary.com/dcwxu3d5g/image/upload/v1721306399/Task%20internship/bot_icon_tfcqux.png' alt="roboAiNav" className='roboaiiconNav'  />
              </li>
              </Tooltip>
            </Link>)
            }
            

            <Link className='linkele' to="/knowledge" data-tip="Dataset">
              <Tooltip className="custom-tool" content="Knowledge" placement="right">
              <li className={`litag ${location.pathname === '/knowledge' ? 'active' : ''}`}>
              <FaCloud style={{ fontSize: '28px' }}/>
              </li>
              </Tooltip>
            </Link>

            <Link className='linkele' to="/tests" data-tip="Client Dataset">
              <Tooltip className="custom-tool" content="Tests" placement="right">
              <li className={`litag ${location.pathname === '/tests' ? 'active' : ''}`}>
              <FaClipboardQuestion style={{ fontSize: '27px' }}/>
              </li>
              </Tooltip>
            </Link>

            <Link className='linkele' to="/courses" data-tip="Search">
              <Tooltip className="custom-tool" content="Courses" placement="right">
              <li className={`litag ${location.pathname === '/courses' ? 'active' : ''}`}>
              <FaGraduationCap style={{ fontSize: '31px' }}/>
              </li>
              </Tooltip>
            </Link>

            <Link className='linkele' to="/finetune" data-tip="Profiles">
              <Tooltip className="custom-tool" content="Finetune" placement="right">
              <li className={`litag ${location.pathname === '/finetune' ? 'active' : ''}`}>
              <GiAutoRepair style={{ fontSize: '31px' }}/>
              </li>
              </Tooltip>
            </Link>

            <Link className='linkele' to="/students" data-tip="New Feature 1">
              <Tooltip className="custom-tool" content="Students" placement="right">
              <li className={`litag ${location.pathname === 'students' ? 'active' : ''}`}>
              <PiStudentFill style={{ fontSize: '31px' }}/>
              </li>
              </Tooltip>
            </Link>

            <Link className='linkele' to="/credits" data-tip="New Feature 2">
              <Tooltip className="custom-tool" content="Credits" placement="right">
              <li className={`litag ${location.pathname === '/credits' ? 'active' : ''}`}>
              <TbCoinRupeeFilled style={{ fontSize: '32px' }}/>
              </li>
              </Tooltip>
            </Link>
          </ul>
        </div>

        {/* Admin and Settings */}
        <ul className='tabiconsContainer1'>
          <Tooltip className="custom-tool" content="Account" placement="right">
          <li className="litag1"  data-tip="Account">
            <MdAccountCircle  style={{ fontSize: '31px' }}/>
          </li>
          </Tooltip>
          <Tooltip className="custom-tool" content="Settings" placement="right">
          <li onClick={toggleSettingsMenu} className="litag1 theme-toggle" data-tip="Settings">
          <IoMdSettings style={{ fontSize: '30px' }}/>
          </li>
          </Tooltip>

          {showSettings && (
            <div className="settings-menu">
              <Tooltip className="custom-tool" content="Logout" placement="right">
              <li onClick={onLogOut} className="litag" data-tip="Logout">
              <MdOutlineLogout  style={{ fontSize: '30px' }}/>
              </li>
              </Tooltip>
              <Tooltip className="custom-tool" content={isDarkMode ? "Light Mode" : "Dark Mode"} placement="right">
              <li onClick={toggleTheme} className="litag" data-tip={isDarkMode ? "Light Mode" : "Dark Mode"}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{ fontSize: '26px' }} />
              </li>
              </Tooltip>
            </div>
          )}
        </ul>

       
      </div>

      <nav className="navbar">
        {isDarkMode ? (
          <div className='logoContmobile'>
            <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719660210/chintu/Legai_1_c1olwj.png" className={`logoimagemobile ${isDarkMode}`} alt="Mobile Logo" />
          </div>
        ) : (
          <div className='logoContmobile'>
            <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1719658345/chintu/Legai_yug6fi.png" className={`logoimagemobile ${isDarkMode}`} alt="Mobile Logo" />
          </div>
        )}

        <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <ul className={`menu ${isOpen ? 'show' : ''}`}>
          <li><a href="#home">Home</a></li>
          <Link className='linkele' to="/voiceAi">
            <li className={`litag ${location.pathname === "/" ? 'active' : ''}`}>
              <span style={{ fontSize: '24px' }}>🎙️Voice Ai</span>
            </li>
          </Link>
          <Link className='linkele' to="/chat">
            <li className={`litag ${location.pathname === '/chat' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faComment} style={{ fontSize: '24px' }} /> <span style={{ fontSize: '24px' }}> Chat</span>
            </li>
          </Link>
          <Link className='linkele' to="/dataset">
            <li className={`litag ${location.pathname === '/dataset' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCloud} style={{ fontSize: '24px' }} /><span style={{ fontSize: '24px' }}> Dataset</span>
            </li>
          </Link>
          <Link className='linkele' to="/clientDataset">
            <li className={`litag ${location.pathname === '/clientDataset' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: '24px' }} /><span style={{ fontSize: '24px' }}> Client Dataset</span>
            </li>
          </Link>
          <Link className='linkele' to="/search">
            <li className={`litag ${location.pathname === '/search' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '24px' }} /><span style={{ fontSize: '24px' }}> Search</span>
            </li>
          </Link>
          <Link className='linkele' to="/profiles">
            <li className={`litag ${location.pathname === '/profiles' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px' }} /><span style={{ fontSize: '24px' }}> Profile</span>
            </li>
          </Link>
        </ul>
      </nav>

    </>
  );
}

export default SideNavigationBar;
