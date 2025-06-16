import React from 'react'
import "../styles/Plans.css"
import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { FaCheck } from "react-icons/fa6";

const Plans = () => {
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
            <a className='cta-btn'>Choose Plan</a>
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
            <a className='cta-btn'>Choose Plan</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans