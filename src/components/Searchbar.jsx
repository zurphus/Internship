import React, { useEffect, useState } from 'react'
import "../styles/Searchbar.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://advanced-internship-api-production.up.railway.app/selectedMovies')
        setMovies(res.data.data || [])
      } catch (err) {
        console.error('Failed to fetch selected movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    if(!openSidebar){
      sidebar.classList.add('sidebar-open')
      setOpenSidebar(true)
    } else{
      sidebar.classList.remove('sidebar-open')
      setOpenSidebar(false)
    }
    
  }

  return (
    <div className="search-wrapper">
        <div className="search-container">
            <FaMagnifyingGlass className='search__icon'/>
            <input
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />

            {query && (
            <div className="search-results">
                <span>Search result</span>
                {loading ? (
                <p>Loading...</p>
                ) : filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                    <div
                    key={movie.id}
                    className="search-result"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                    <img src={movie.imageLink} alt={movie.title} />
                    <div className="result-info">
                        <h4>{movie.title}</h4>
                        <p>{movie.releaseYear}</p>
                    </div>
                    </div>
                ))
                ) : (
                <p className="no-results">No movies found.</p>
                )}
            </div>
            )}
            {
              width <= 768 && (
                <>
                  <button onClick={toggleSidebar} className="burger">
                    <div className="burger__line"></div>
                    <div className="burger__line"></div>
                    <div className="burger__line"></div>
                  </button>
                  <div onClick={toggleSidebar} className={`${openSidebar ? "overlay-open" : "overlay-closed"} overlay`}></div>
                </>
              )
            }
            
      </div>
    </div>
  )
}

export default SearchBar
