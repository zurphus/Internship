import React from 'react'
import '../../styles/landing/Summary.css'
import summaryImg from "../../assets/summary.png"


const Summary = () => {
  return (
    <section id="summary">
        <div className="container">
          <div className="row summary__row">
            <div className="summary__text">
              <div className="summary__widget">
                <span className="summary__widget__title">The future of entertainment</span>
                <span className="summary__widget__emoji"> ⏺ </span>
                <span className="summary__widget__description">
                 AI
                </span>
              </div>
              <h2 className="summary__title">
                Say goodbye to 2 hour movies.
              </h2>
              <p className="summary__para">
                HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in just minutes instead of hours.
              </p>
            </div>
            <figure className="summary__figure">
              <img src={summaryImg} alt="" className="summary__figure__img" />
              <span className="summary__figure__caption1">
                Search. Summarise. Repeat.
              </span>
              <span className="summary__figure__caption2">
                Powered by AI
              </span>
            </figure>
          </div>
        </div>
    </section>
  )
}

export default Summary