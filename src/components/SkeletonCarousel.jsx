import React from 'react'
import '../styles/SkeletonCarousel.css'

const SkeletonCarousel = () => {
  return (
    <div className="skeleton-carousel">
      <div className="skeleton shimmer" />
      <div className="skeleton shimmer" />
      <div className="skeleton shimmer" />
      <div className="skeleton shimmer" />
      <div className="skeleton shimmer" />
      <div className="skeleton shimmer" />
    </div>
  )
}

export default SkeletonCarousel
