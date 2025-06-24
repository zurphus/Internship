import React, { useState, useRef, useEffect } from 'react'
import { auth } from '../firebase/firebase'
import "../styles/Plans.css"
import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { loadStripe } from '@stripe/stripe-js'

import { ImSpinner8 } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { CiGlass } from 'react-icons/ci'
import { loadCheckout, loadPortal } from '../stripe/stripePayment'
import { getSubscriptionStatus } from '../stripe/getPremiumStatus'

import { useNavigate } from 'react-router-dom'

const accordionData = [
  {
    question: 'What is Hollywood AI?',
    answer: 'HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in just minutes instead of hours.'
  },
  {
    question: 'How much does Hollywood AI cost?',
    answer: 'Get summaries of your favourite movies on your smartphone, tablet or laptop, all for one fixed monthly or yearly fee. Plans range from $19 per month to $190 per year. No extra costs, no contracts.'
  },
  {
    question: 'What can I watch on Hollywood AI?',
    answer: 'Hollywood AI has an extensive library of feature films. Watch as much as you want, at any time that you want.'
  }
]

const stripePromise = loadStripe('pk_test_51RZsOCP07fN40ljCsKT7ImGPaZZ1XSITv6izpdLDiK8yA2eEAci6lRo6vC8h4Ze51HuL7VItVVh49kA3eNMFTjd400jrAtOtYf')

const Plans = () => {

  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null)
  const [isPremium, setIsPremium] = useState(false)
  const [buttonClicked1, setButtonClicked1] = useState(false)
  const [buttonClicked2, setButtonClicked2] = useState(false)
  const refs = useRef([])

  const toggleAccordion = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index))
  }

  const monthlyPriceId = 'price_1RZsRCP07fN40ljCQ2NmQsAa'
  const yearlyPriceId = 'price_1RZsSaP07fN40ljCDSY1jFuK'

  const upgradeToPremium = async (priceId) => {
    loadCheckout(priceId)
  }

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const premiumStatus = await getSubscriptionStatus()
      setIsPremium(premiumStatus)
    }

    checkPremiumStatus()
  }, [auth.currentUser])

  useEffect(() => {
    setButtonClicked1(false)
    setButtonClicked2(false)
  }, [])

  useEffect(() => {
    if(isPremium) {
      navigate('/settings')
    }
  }, [isPremium])

  return (
    <div className='plans page'>
      <SearchBar />
      <Sidebar />
      <div className="plans__title">
        <div className="plans__title__content">
          <h1>Plans</h1>
          <p>Get unlimited access to our extensive library of movie summaries.</p>
        </div>
      </div>
      <div className="plans__content">
        <h2>Subscription Plans:</h2>
        <div className="plans__subscription">
          <div className="plans__subscription__col">
            <div className="plan__price">
              <span className="plan__price__dollar">$</span>
              <h3>19</h3>
              <span className="plan__price__frequency">Monthly</span>
            </div>
            <span className='plan__type'>Premium</span>
            <div className="plan__features">
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">Premium Support</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">Access 100+ Summaries</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">Higher Quality Audio</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">License For Commercial Use</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">2 Supported Devices</p>
              </div>
            </div>
            <button onClick={() => { upgradeToPremium(monthlyPriceId), setButtonClicked1(true)}} className='cta-btn'>
              {buttonClicked1 ? <ImSpinner8 className='spinner-icon'/> : "Choose Plan"}
            </button>
          </div>
          <div className="plans__subscription__col">
            <div className="plan__price">
              <span className="plan__price__dollar">$</span>
              <h3>190</h3>
              <span className="plan__price__frequency">Yearly</span>
            </div>
            <span className='plan__type'>VIP+</span>
            <div className="plan__features">
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">2 Months Free</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">Access 100+ Summaries</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">Highest Quality Audio</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">License For Commercial Use</p>
              </div>
              <div className="plan__feature">
                <div className="plan__feature__icon"><FaCheck /></div>
                <p className="plan__feature__text">3 Supported Devices</p>
              </div>
            </div>
            <button onClick={() => { upgradeToPremium(yearlyPriceId), setButtonClicked2(true) }} className='cta-btn'>
              {buttonClicked2 ? <ImSpinner8 className='spinner-icon'/> : "Choose Plan"}
            </button>
          </div>
        </div>
      </div>
      <div className="faq">
      {accordionData.map((item, index) => (
        <div key={index} className="accordion">
          <div
            className="accordion__header"
            onClick={() => toggleAccordion(index)}
            // style={{
            //   height: activeIndex === index ? `${refs.current[index]?.scrollHeight + 96}px` : 0
            // }}
          >
            <h4>{item.question}</h4>
            <LuPlus />
          </div>
          <div
            ref={el => (refs.current[index] = el)}
            className="accordion__description"
            style={{
              height: activeIndex === index ? refs.current[index]?.scrollHeight : 0,
              overflow: 'hidden',
              transition: 'height 0.5s ease'
            }}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Plans