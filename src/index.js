/* 3rd Party Libraries */
import React from 'react'
import ReactDOM from 'react-dom'

/* Components */
import Router from './router/Router'

/* Styling */
import './styles/index.css'
import './styles/App.css'

/* Utility */
import * as serviceWorker from './serviceWorker'


// Bind the react code to the target element in the HTML
ReactDOM.render(<Router />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
