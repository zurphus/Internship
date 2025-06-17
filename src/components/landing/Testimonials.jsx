import React from 'react'
import '../../styles/landing/Testimonials.css'
import image1 from "../../assets/testimonial-1.png"
import image2 from "../../assets/testimonial-2.png"
import image3 from "../../assets/testimonial-3.png"

const Testimonials = () => {
  return (
    <section id="testimonials">
        <div className="container">
          <div className="row testimonials__row">
            <div className="testimonials__widget">
              <span className="testimonials__widget__title">Testimonials</span>
              <span className="testimonials__widget__emoji">⏺</span>
              <span className="testimonials__widget__description">
               TrustPilot
              </span>
            </div>
            <h2 className="testimonials__title">
              What our members say.
            </h2>
            <div className="testimonials__list">
              <div className="testimonial">
                <img src={image1} alt="" className="testimonial__img" />
                <span className="testimonial__name">
                  Olivia Chapman
                </span>
                <span className="testimonial__occupation">
                  Student
                </span>
                <p className="testimonial__para">
                  "Hollywood AI made big promises and delivered on them! Absolutely cannot live without this tool!"
                </p>
              </div>
              <div className="testimonial">
                <img src={image2} alt="" className="testimonial__img" />
                <span className="testimonial__name">
                  Eric Fisherman
                </span>
                <span className="testimonial__occupation">
                  Professor
                </span>
                <p className="testimonial__para">
                  "Definitely worth the purchase if you are a busy person who stills want to keep up with the latest movies"
                </p>
              </div>
              <div className="testimonial">
                <img src={image3} alt="" className="testimonial__img" />
                <span className="testimonial__name">
                  Anisong Silkum
                </span>
                <span className="testimonial__occupation">
                  Student
                </span>
                <p className="testimonial__para">
                  "The summaries provide a really great overview of the movies.  It's also very easy to use. 5/5!"
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Testimonials