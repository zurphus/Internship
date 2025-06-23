import React, { useState, useEffect, useContext, useRef } from 'react'
import "../styles/MoviePlayer.css"
import SearchBar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { IoMdPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { IoIosFastforward } from "react-icons/io";
// import { CiPause1 } from 'react-icons/ci'


const MoviePlayer = () => {
  const { openAuthModal, currentUser } = useContext(AuthContext)
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  const audioRef = useRef(null)
  const progressBarRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${id}`)
        const data = await res.json()
        setMovie(data.data)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])


  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    if (!isDragging) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const startDrag = (e) => {
    setIsDragging(true)
    handleSeek(e)

    window.addEventListener('mousemove', handleSeek)
    window.addEventListener('mouseup', stopDrag)
    
  }

  const stopDrag = () => {
    setIsDragging(false)

    window.removeEventListener('mousemove', handleSeek)
    window.removeEventListener('mouseup', stopDrag)
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !progressBarRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const seekTime = (offsetX / rect.width) * duration

    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const skipTime = (amount) => {
    if (!audioRef.current) return
    let newTime = audioRef.current.currentTime + amount
    if (newTime < 0) newTime = 0
    if (newTime > duration) newTime = duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className='player page'>
      <Sidebar />
      <SearchBar />
      {
        movie && (
          <div className="player__content">
            <div className="player__title">
              <h1>{movie.title}</h1>
            </div>
            <audio
              ref={audioRef}
              src={`https://advanced-internship-api-production.up.railway.app/${movie.audioLink}`}
              controls={false}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            <p>{movie.summary}</p>
            <div className="player__bar">
              <div className="player__bar__info">
                <img src={movie.imageLink} alt={movie.title} />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.director}</p>
                </div>
              </div>
              <div className="player__bar__controls">
                <button style={{ transform: "rotate(180deg)" }} onClick={() => skipTime(-10)}><IoIosFastforward className='player__bar__fast-forward' /></button>
                <button onClick={togglePlay}>
                  {isPlaying ? <IoIosPause className='player__bar__toggle' /> : <IoMdPlay className='player__bar__toggle' />}
                </button>
                <button onClick={() => skipTime(10)}><IoIosFastforward className='player__bar__fast-forward' /></button>
              </div>

              <div className="player__bar__timer">
                <p>{formatTime(currentTime)}</p>
                <div
                  ref={progressBarRef}
                  className="player__bar__timer__line"
                  onMouseDown={startDrag}
                >
                  <div
                    className='player__bar__timer__line-fill'
                    aria-label="Seek audio"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      height: '4px',
                      width: `${(currentTime / duration) * 100}%`,
                      backgroundColor: '#f00',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <p>{formatTime(duration)}</p>
              </div>
            </div>
          </div>
        )
      }
      <div style={{ display: `${isDragging ? "block" : "none"}` }} className="player__bar-drag"></div>
    </div>
  )
}

function formatTime(time) {
  if (!time) return '00:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default MoviePlayer
