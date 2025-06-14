import React from 'react'
import '../../styles/landing/Navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const { openAuthModal, closeAuthModal } = useContext(AuthContext)

  return (
    <nav>
      <a href="#">
        <img src="assets/logo-dark.png" alt="" className="nav__logo" />
      </a>
      <div className="nav__links">
        <a href="#" className="nav__link">
          About
        </a>
        <a href="#" className="nav__link">
          Features
        </a>
        <a href="#" className="nav__link">
          How it works
        </a>
        <a href="#" className="nav__link">
          Privacy policy
        </a>
      </div>
        <button onClick={openAuthModal} className="nav__button">Sign In</button>
    </nav>
  )
}

export default Navbar