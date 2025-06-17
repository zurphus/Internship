import React, { useEffect, useState, useContext } from 'react'
import "../styles/Favorites.css"
import { Link } from 'react-router-dom'

import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'

import { AuthContext } from '../context/AuthContext'

import { FaRegStar } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'

import loginImg from '../assets/login.webp'

const Favourites = () => {

  const { getFavorites, currentUser, openAuthModal } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser) {
        const favs = await getFavorites()
        setFavorites(favs)
      }
    }

    fetchFavorites()
  }, [currentUser])

  return (
    <div>
      <Sidebar />
      <div className="settings page">
        <SearchBar />
        <div className="settings__content">
          <div className="settings__title-wrap">
            <h1>Favorites</h1>
            <span>{favorites.length} Movies</span>
          </div>
          
          {
            currentUser ? (
              <div className="favorites-all">
                {
                  favorites.map((favorite) => (
                    <Link to={`/movie/${favorite.id}`} className="embla__slide" key={favorite.id}>
                      <img src={favorite.imageLink} alt={favorite.title} className="movie-image" />
                      <div className="movie-info">
                        <h4>{favorite.title}</h4>
                        <p>{favorite.director}</p>
                        <div className='movie-ratings'>
                          <div>
                            <FaRegStar />
                            <p>{favorite.rating}</p>
                          </div>
                          <div>
                            <MdDateRange />
                            <p>{favorite.releaseYear}</p>
                          </div>
                        </div>
                        {favorite.subscriptionRequired && <span className="premium-tag">Premium</span>} 
                      </div>
                    </Link>
                  ))
                }
              </div>
            ) : (
              <>
                <div className="settings__login">
                  <img src={loginImg} alt="" />
                  <p>Sign in to see your account settings</p>
                  <button onClick={openAuthModal} className='cta-btn'>Login</button>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Favourites