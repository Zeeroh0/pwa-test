import React from 'react'

import wtlogo from './wt_light.png'


const Home = () => (
  <header className="App-header">
    <img src={wtlogo} className="App-logo" alt="logo" />
    <p>
      This is a preview of WolffTrack's coming <a href='https://developers.google.com/web/progressive-web-apps/checklist' target='_blank' rel='noopener noreferrer' >PWA</a>!
    </p>
  </header>
)

export default Home
