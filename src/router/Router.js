import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Layout from './Layout'
import { Home, About, Contact } from '../pages'


class Router extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Layout path='/' component={Home} exact />
          <Layout path='/about' component={About} exact />
          <Layout path='/contact' component={Contact} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
