import React from 'react'
import '../styles/landing/Responsive.css'

import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Summary from '../components/landing/Summary'
import Steps from '../components/landing/Steps'
import Testimonials from '../components/landing/Testimonials'
import Footer from '../components/landing/Footer'
import AuthModal from '../components/AuthModal'

const Landing = () => {
  return (
    <>
    <AuthModal />
        <Navbar />
        <Hero />
        <Features />
        <Summary />
        <Steps />
        <Testimonials />
        <Footer />
    </>
  )
}

export default Landing