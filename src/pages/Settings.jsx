import React, { useContext } from 'react'
import "../styles/Settings.css"
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/Searchbar'
import AuthModal from '../components/AuthModal'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import loginImg from "../assets/login.webp"

const Settings = () => {

  const { openAuthModal, currentUser } = useContext(AuthContext)

  return (
    <div>
      <Sidebar />
      <div className="settings page">
        <SearchBar />
        <div className="settings__content">
        <div className="settings__title-wrap">
          <h2>Settings</h2>
        </div>
        {!currentUser ? (
          <>
            <div className="settings__login">
              <img src={loginImg} alt="" />
              <p>Sign in to see your account settings</p>
              <button onClick={openAuthModal} className='cta-btn'>Login</button>
            </div>
          </>
        ) : (
          <>
            <div className="settings__info">
              <p>Your Subscription Plan</p>
              <span>Basic</span>
              <Link to="/plans" className='cta'>Upgrade</Link>
            </div>
            <div className="settings__info">
              <p>Email</p>
              <span>{currentUser.email}</span>
            </div>
          </>
        )}
      </div>
      </div>
      <AuthModal />
    </div>
  )
}

export default Settings