import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const scrollToAbout = (e) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar-simple">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">ALFAL</Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about" onClick={scrollToAbout}>About</a></li>
        </ul>

        <a href="/alfal-latest.apk" className="nav-btn">Download APK</a>
      </div>
    </nav>
  )
}
