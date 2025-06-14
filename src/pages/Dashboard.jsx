import React, { useState, useEffect } from 'react'
import "../styles/Dashboard.css"
import Sidebar from '../components/Sidebar'

import useEmblaCarousel from 'embla-carousel-react'
import EmblaCarousel from '../components/EmblaCarousel'
import SearchBar from '../components/Searchbar'

const OPTIONS = { align: 'start', loop: true }

const Dashboard = () => {

  const [selectedMovies, setSelectedMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [premiumPill, setPremiumPill] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const res1 = await fetch('https://advanced-internship-api-production.up.railway.app/selectedMovies')
      const res2 = await fetch('https://advanced-internship-api-production.up.railway.app/topMovies')

      const data1 = await res1.json()
      const data2 = await res2.json()

      console.log('Selected Movies:', data1)
      console.log('Top Movies:', data2)

      setSelectedMovies(data1.data)
      setTopMovies(data2.data)
    }

    fetchMovies()
  }, [])


  return (
    <div>
      <Sidebar />
      <div className="dashboard page">
        <SearchBar />
        <div className="dashboard__heading">
          <div>
            <h2>AI Movie Summarizer</h2>
            <p>Enjoy high-quality summaries of your favourite movies instantly without breaking a sweat.</p>
          </div>
        </div>
        <div className="dashboard__selected">
          <div>
            <h3>Selected just for you</h3>
            <p>We think you’ll like these.</p>
          </div>
        </div>
        <div className="dashboard__carousel">
          <EmblaCarousel movies={selectedMovies} options={OPTIONS} />
        </div>
        <div className="dashboard__selected">
          <div>
            <h3>Top Movies</h3>
            <p>Enjoy our highest rated films.</p>
          </div>
        </div>
        <div className="dashboard__carousel">
          <EmblaCarousel movies={topMovies} options={OPTIONS} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard