// components/EmblaCarousel.jsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import '../styles/EmblaCarousel.css'
import SkeletonCarousel from './SkeletonCarousel'
import '../styles/SkeletonCarousel.css'
import { Link } from 'react-router-dom'

const EmblaCarousel = ({ movies, options }) => {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <>
    {/* <SkeletonCarousel /> */}
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
      <div className="embla__container">
        {
          movies.length === 0 ? (
            <>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            <div className="embla__slide">
              <div className="skeleton skeleton-carousel-img"></div>
              <div className="skeleton skeleton-carousel-text-big"></div>
              <div className="skeleton skeleton-carousel-text-small"></div>
              <div className="skeleton skeleton-carousel-text-medium"></div>
            </div>
            </>
          ) : (
            movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} className="embla__slide" key={movie.id}>
                <img src={movie.imageLink} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <p>{movie.director}</p>
                  <div className='movie-ratings'>
                    <p>{movie.rating}</p>
                    <p>{movie.releaseYear}</p>
                  </div>
                  {movie.subscriptionRequired && <span className="premium-tag">Premium</span>} 
                </div>
              </Link>
            ))
          )
        }
        
        </div>
      </div>
    </div>
    </>
  )
}

export default EmblaCarousel
