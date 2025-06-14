import React from 'react'
import '../../styles/landing/Features.css'

const Features = () => {
  return (
    <section id="features">
         <div className="container">
          <div className="row features__row">
             <h1 className="features__title">
              The future of AI.
             </h1>
             <div className="features__para">
              HollywoodAI is designed to help you enjoy high-quality summaries instantly, without breaking a sweat.
             </div>
             <div className="features__list">
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-solid fa-pen"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    AI Generated Summaries
                  </h4>
                  <p className="feature__text__para">
                    Save time with summaries of the world's best movies.
                  </p>
                </div>
               </div>
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-regular fa-circle-play"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Read or Listen
                  </h4>
                  <p className="feature__text__para">
                    Switch between reading and listening modes seamlessly.
                  </p>
                </div>
               </div>
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-solid fa-bars-staggered"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                   Find Your Next Flick
                  </h4>
                  <p className="feature__text__para">
                    Explore our movie lists and personalized recommendations.
                  </p>
                </div>
               </div>
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-solid fa-mobile"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Multi Platform Access
                  </h4>
                  <p className="feature__text__para">
                    Enjoy your favourite movies on any device.
                  </p>
                </div>
               </div>
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-solid fa-shield"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Payment Gateways
                  </h4>
                  <p className="feature__text__para">
                    We securely process all card payments.
                  </p>
                </div>
               </div>
               <div className="feature">
                <div className="feature__iconWrapper">
                  <i className="feature__icon fa-solid fa-hands-holding-circle"></i>
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Eco-Friendly Option
                  </h4>
                  <p className="feature__text__para">
                     HollywoodAI donates 10% of profits to charities.
                  </p>
                </div>
               </div>
             </div>
          </div> 
         </div>
    </section>
  )
}

export default Features