import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.svg'
import '../App.css'


const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        This is Tyler's playground for building a PWA
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <nav>
        <Link to='/about' >About</Link>
        <Link to='/contact' >Contact</Link>
      </nav>
    </header>
  </div>
)

export default Home
