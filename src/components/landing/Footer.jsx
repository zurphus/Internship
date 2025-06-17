import React from 'react'
import '../../styles/landing/Footer.css'
import logo from "../../assets/logo-light.png"

const Footer = () => {
  return (
    <footer>
      <section id="cta">
        <svg className="cta__svg" preserveAspectRatio="none" width="1440" height="86" viewBox="0 0 1440 86" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 85.662C240 29.1253 480 0.857 720 0.857C960 0.857 1200 29.1253 1440 85.662V0H0V85.662Z"></path>
        </svg>
        <div className="container">
          <div className="row cta__row">
             <p className="cta__widget">
              <span className="cta__widget__logo">HollywoodAI</span>
              Endless benefits, one subscription.
             </p>
              <h2 className="cta__title">
                Start your free trial.
              </h2>
              <p className="cta__para">
               Enjoy your favourite movies in minutes by letting AI do the work for you.
              </p>
              <button className="cta__button">
                 <span className="cta__button__text">
                  Join HollywoodAI
                 </span>
                 <img src="assets/bolt.svg" alt="" className="cta__button__icon" />
              </button>
          </div>
        </div>
      </section>
      <section id="links">
         <div className="links__container">
          <img src={logo} alt="" className="links__logo" />
          <div className="links__list">
            <a className="links__link" href="#">
              <i className="fa-brands fa-instagram links__link__icon"></i>
              <span className="links__link__text">
                Instagram
              </span>
            </a>
            <a className="links__link" href="#">
              <i className="fa-brands fa-twitter links__link__icon"></i>
              <span className="links__link__text">
                Twitter
              </span>
            </a>
            <a className="links__link" href="#">
              <i className="fa-brands fa-facebook links__link__icon"></i>
              <span className="links__link__text">
                Facebook
              </span>
            </a>
            <a className="links__link" href="#">
              <i className="fa-brands fa-tiktok links__link__icon"></i>
              <span className="links__link__text">
                Tiktok
              </span>
            </a>
          </div>
         </div>
      </section> 
      <section id="copyright">
          <div className="copyright__container">
            <form action="" className="copyright__form">
               <input type="text" className="copyright__form__input"
               placeholder="Enter your email"
               />
               <button type="button" className="copyright__form__button">
                Subscribe
               </button>
            </form>
            <span className="copyright__text">
              2024 Copyright © Hollywood AI
            </span>
          </div>
      </section>
    </footer>
  )
}

export default Footer