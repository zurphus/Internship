import React, {  useContext, useEffect, useState } from 'react'
import "../styles/MovieDetails.css"

import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FaBookmark } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";

import { AuthContext } from '../context/AuthContext'
import { getSubscriptionStatus } from '../stripe/getPremiumStatus'


const MovieDetails = () => {

  const { getFavorites, openAuthModal, currentUser, addToFavorites, removeFromFavorites } = useContext(AuthContext)

  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    console.log(id)
  }, [])

  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const res = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${id}`)
      const data = await res.json()

      console.log("Fetched Movie:", data)
      setMovie(data.data)
    } catch (error) {
      console.error("Error fetching movie:", error)
    }
  }

  fetchMovie()
}, [id])


  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!currentUser) return

      try {
        const favorites = await getFavorites()
        const found = favorites.some(fav => fav.id === id)
        setIsFavorite(found)
      } catch (error) {
        console.error("Error checking favorites:", error)
      }
    }

    checkIfFavorite()
  }, [currentUser, id])



  const [isPremium, setIsPremium] = useState(false)
  
    useEffect(() => {
      const checkPremiumStatus = async () => {
        const premiumStatus = await getSubscriptionStatus()
        console.log(premiumStatus)
        setIsPremium(premiumStatus)
      }
  
      checkPremiumStatus()
    }, [])

  return (
    <>
      <div className='movie page'>
        <Sidebar />
        <SearchBar />
        <div className="movie__content">
          <div className='movie__col1'>
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
                    isPremium ? (
                      <Link to={`/player/${movie.id}`} className="cta-btn">
                        Summarize
                        <HiLightningBolt />
                      </Link>
                    ) : (
                      <Link to="/plans" className="cta-btn">
                        Subscribe to Summarize
                        <HiLightningBolt />
                      </Link>
                    )
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
              
              <button
                onClick={async () => {
                  if (isFavorite) {
                    await removeFromFavorites(movie)
                  } else {
                    await addToFavorites(movie)
                  }
                  setIsFavorite(prev => !prev)
                }}
                className='movie__details__favorites'
              >
                {isFavorite ? <FaBookmark className='movie__details__favorites-icon' /> : <FaRegBookmark className='movie__details__favorites-icon' />}
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              
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
              <img className='movie__img movie__col2' src={movie.imageLink} alt="img" />
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