import React from 'react'
import { Route, Link } from 'react-router-dom'


class Layout extends React.Component {
  state = {
    showInstallPwaArea: false,
    installStatus: 'pending',
  }

  togglePwaArea = () => {
    const { showInstallPwaArea } = this.state;
    this.setState({ showInstallPwaArea: !showInstallPwaArea })
  }

  updateInstallStatus = installStatus => {
    this.setState({ installStatus })
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { showInstallPwaArea, installStatus } = this.state;

    return (
      <Route
        {...rest}
        render={props => (
          <div className={`App-wrapper ${showInstallPwaArea ? 'show-pwa-btn-area' : ''}`} >
            <InstallButton
              showAddInstallArea={showInstallPwaArea}
              togglePwaArea={this.togglePwaArea}
              installStatus={installStatus}
              updateInstallStatus={this.updateInstallStatus}
            />
            <Navigation  />
            <div className="App">
              <Component {...props} />
            </div>
            <Footer />
          </div>
        )}
      />
    )
  }
}

export default Layout




class InstallButton extends React.Component {
  state = {
    deferredPrompt: null,
  }

  componentDidMount() {
    const { updateInstallStatus, togglePwaArea } = this.props;
    // Check to see if the user is already running your PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('User has already installed this PWA and is running in standalone')
      updateInstallStatus('installed')
    } else {
      // Otherwise, let's begin the install process/event
      window.addEventListener('beforeinstallprompt', e => {
        console.log('beforeinstallprompt has fired', e)
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.setState({ deferredPrompt: e })
        // Update the UI to indicate to user that they can add to the home screen
        togglePwaArea()
      })
    }

    // When the app gets installed
    window.addEventListener('appinstalled', e => {
      console.log('App was successfully installed :D')
      updateInstallStatus('installed')
    })
  }

  handleInstallBtnClick = e => {
    const { togglePwaArea, updateInstallStatus } = this.props;
    const { deferredPrompt } = this.state;
    // Hide the button
    togglePwaArea()
    if (deferredPrompt) {
      // Show the prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          // They accepted.  Do your stuff?
          console.log('User has green lit the installation of this PWA! Woohoo!')
          updateInstallStatus('accepted')
        } else {
          // They denied; wait till the next 'beforeinstallprompt' event is fired on the next page navigation
          console.log("User says shut it down, son.  No PWA install today :'(")
          updateInstallStatus('declined')
        }
        this.setState({ deferredPrompt: null })
      })
      .catch(err => {
        console.log(`There was an error with the userChoice(): ${err}`)
        this.setState({ deferredPrompt: null })
      })
    }
  }

  render() {
    const { showAddInstallArea } = this.props;

    return (
      <div className={`add-pwa-btn-wrapper ${showAddInstallArea ? 'show-pwa-install-btn' : ''}`}>
        <button className='add-pwa-btn' onClick={this.handleInstallBtnClick} >Install</button>
      </div>
    )
  }
}


const Navigation = () => (
  <nav>
    <Link to='/' >Home</Link>
    <Link to='/about' >About</Link>
    <Link to='/contact' >Contact</Link>
  </nav>
)

const Footer = () => (
  <footer>
    <div className="icon-credit">
      Icons made by <a href="https://www.freepik.com/" title="Freepik"> Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer" > CC 3.0 BY</a>
    </div>
  </footer>
)
