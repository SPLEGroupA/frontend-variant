import React from 'react'
import { Link } from "react-router";

const Hero = ({ banner }) => {
  return (
    <div
    className="hero min-h-screen"
  >
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={banner} className="max-w-prose rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Selamat Datang!</h1>
            <p className="py-6">Yuk cari tahu lebih lanjut mengenai kami!</p>
            <Link to="/aboutus">
            	<button className="btn btn-primary">Tentang Kami</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
