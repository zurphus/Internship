import React, { useState, useEffect, useContext } from 'react'
import "../styles/Settings.css"
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/Searchbar'
import AuthModal from '../components/AuthModal'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { getSubscriptionStatus } from '../stripe/getPremiumStatus'

import loginImg from "../assets/login.webp"
import { HiLightningBolt } from "react-icons/hi";
import { loadPortal } from '../stripe/stripePayment'

const Settings = () => {

  const { openAuthModal, currentUser } = useContext(AuthContext)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const premiumStatus = await getSubscriptionStatus()
      console.log(premiumStatus)
      setIsPremium(premiumStatus)
    }

    checkPremiumStatus()
  }, [])

  const manageSubscription = async () => {
    loadPortal()
  }

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
              {
                isPremium ? (
                  <>
                    <span className='premium'>Premium</span>
                    {/* <button onClick={manageSubscription} className='cta-btn '>Manage<HiLightningBolt /></button> */}
                  </>
                ) : (
                  <>
                    <span className='basic'>Basic</span>
                    <Link to="/plans" className='cta-btn '>Upgrade<HiLightningBolt /></Link>
                  </>
                )
              }
              
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