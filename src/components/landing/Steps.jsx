import React from 'react'
import '../../styles/landing/Steps.css'


const Steps = () => {
  return (
    <section id="steps">
        <div className="container">
        <div className="row steps__row">
            <h2 className="steps__title">
                So, how does it work?
            </h2>
            <div className="steps__list">
            <div className="step-divider"></div>
            <div className="step">
                <div className="step__number">
                <span>
                    1
                </span>
                </div>
                <div className="step__para">
                Browse through our wide selection of the world's most popular movies
                </div>
            </div>
            <div className="step">
                <div className="step__number">
                <span>
                    2
                </span>
                </div>
                <div className="step__para">
                Simply select a movie you'd like to have summarised and let our AI algorithms do the rest.
                </div>
            </div>
            <div className="step">
                <div className="step__number">
                <span>
                    3
                </span>
                </div>
                <div className="step__para">
                Take a couple of minutes to read and listen to the summary. And you’re done!
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Steps