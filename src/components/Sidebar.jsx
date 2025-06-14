import React, { useContext } from 'react'
import "../styles/Sidebar.css"
import { Link } from 'react-router-dom'
import logoDark from "../assets/logo-dark.png"
import AuthModal from './AuthModal'

import { AuthContext } from '../context/AuthContext'

import { LuLayoutDashboard } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

const Sidebar = () => {

    const { currentUser, logout, openAuthModal, closeAuthModal } = useContext(AuthContext)
  
    return (
    <div className='sidebar'>
        <img src={logoDark} alt="" />

        <div className="sidebar__links">
            <span>Links</span>
            
            <Link className='sidebar__link' to="/dashboard">
                <LuLayoutDashboard />
                Dashboard
            </Link>
            <Link className='sidebar__link' to="/favourites">
                <CiBookmark />
                Favourites
            </Link>
            <div className='sidebar__link disabled'>
                <FaMagnifyingGlass />
                Search
            </div>
            <div className='sidebar__link disabled'>
                <IoIosTrendingUp />
                Trending
            </div>
        </div>
        <div className="sidebar__links">
            <span>Extras</span>
            
            <div className='sidebar__link disabled'>
                <IoIosHelpCircleOutline />
                Help & Support
            </div>
            <Link to="/settings" className='sidebar__link'>
                <IoMdSettings />
                Settings
            </Link>
            {
                currentUser ? (
                    <button onClick={logout} className='sidebar__link'>
                        <CiLogin />
                        Log out
                    </button>
                ) : (
                    <button onClick={openAuthModal} className='sidebar__link'>
                        <CiLogin />
                        Log in
                    </button>
                )
            }
            
        </div>
        <AuthModal />
    </div>
  )
}

export default Sidebar