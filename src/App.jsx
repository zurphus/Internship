import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MovieDetails from './pages/MovieDetails'
import MoviePlayer from './pages/MoviePlayer'
import Plans from './pages/Plans'
import Settings from './pages/Settings'
import Favourites from './pages/Favourites'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/player/:id" element={<MoviePlayer />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
