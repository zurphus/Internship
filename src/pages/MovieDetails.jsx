import React, {  useContext, useEffect, useState } from 'react'
import "../styles/MovieDetails.css"

import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";

import { AuthContext } from '../context/AuthContext'

const MovieDetails = () => {

  const { openAuthModal, currentUser } = useContext(AuthContext)

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    console.log(id)
  }, [])

  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const res = await fetch('https://advanced-internship-api-production.up.railway.app/selectedMovies')
      const data = await res.json()
      const allMovies = data.data

      const foundMovie = allMovies.find(m => m.id === id)

      console.log("Found Movie:", foundMovie)
      setMovie(foundMovie)
    } catch (error) {
      console.error("Error fetching movie:", error)
    }
  }

  fetchMovie()
}, [id])



  return (
    <>
      <div className='movie page'>
        <Sidebar />
        <SearchBar />
        <div className="movie__content">
          <div>
            {
              movie ? (
                <>
                  <div className="movie__title">
              <h1>{movie.title} {movie.subscriptionRequired && "(Premium)"}</h1>
              <span className='movie__subtitle'>{movie.director}</span>
            </div>
            <div className="movie__info">
              <div className="movie__info__col">
                <FaRegStar />
                <span>{movie.rating}</span>
              </div>
              <div className="movie__info__col">
                <FaRegClock />
                <span>19:20</span>
              </div>
              <div className="movie__info__col">
                <FaMicrophone />
                <span>{movie.type}</span>
              </div>
              <div className="movie__info__col">
                <MdDateRange />
                <span>{movie.releaseYear}</span>
              </div>
            </div>
            <div className="movie__details">
              {
                currentUser ? (
                  movie.subscriptionRequired ? (
                    <Link to="/plans" className="cta-btn">
                      {/* another condition if user has premium */}
                      Subscribe to Summarize
                      <HiLightningBolt />
                    </Link>
                  ) : (
                    <Link to={`/player/${movie.id}`} className="cta-btn">
                      Summarize
                      <HiLightningBolt />
                    </Link>
                  )
                ) : (
                  <button onClick={openAuthModal} className="cta-btn">
                    Summarize
                    <HiLightningBolt />
                  </button>
                )
              }
              
              <button className='movie__details__favorites'><FaRegBookmark className='movie__details__favorites-icon' /> Add to Favourites</button>
              <div className="movie__details__content">
              <h3>What's it about?</h3>
              <div className="movie__details__tags">
                {
                  movie.tags.map((tag, index) => {
                    return (
                      <div key={index} className="movie__details__tag">
                        {tag}
                      </div>
                    )
                  })
                }
              </div>
              <p>{movie.movieDescription}</p>
            </div>
            </div>
                </>
              ) : (
                <div></div>
              )
            }
            
          </div>
          
          {
            movie ? (
              <img className='movie__img' src={movie.imageLink} alt="img" />
            ) : (
              <div></div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default MovieDetails