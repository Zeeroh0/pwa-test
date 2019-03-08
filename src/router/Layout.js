import React from 'react'
import { Route, Link } from 'react-router-dom'


const Layout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div className='app-wrapper' >
        <Navigation  />
        <div className="App">
          <Component {...props} />
        </div>
      </div>
    )}
  />
)

export default Layout



const Navigation = () => (
  <nav>
    <Link to='/' >Home</Link>
    <Link to='/about' >About</Link>
    <Link to='/contact' >Contact</Link>
  </nav>
)
