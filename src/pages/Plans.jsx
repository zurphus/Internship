import React, { useState, useRef } from 'react'
import "../styles/Plans.css"
import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { loadStripe } from '@stripe/stripe-js'

import { FaCheck } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";



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

  const [activeIndex, setActiveIndex] = useState(null)
  const refs = useRef([])

  const toggleAccordion = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index))
  }

  const monthlyPriceId = 'price_monthly123'
  const yearlyPriceId = 'price_yearly456'

  async function handleSubscribe(priceId) {
    try {
      const response = await fetch('https://us-central1-hollywood-ai-6bb5b.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) alert(error.message)
    } catch (error) {
      alert("failed, error", error)
      console.log(error)
    }
  }

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
            <button onClick={() => handleSubscribe(monthlyPriceId)} className='cta-btn'>Choose Plan</button>
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
            <button onClick={() => handleSubscribe(yearlyPriceId)} className='cta-btn'>Choose Plan</button>
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