import React from 'react'
import { Route, Link } from 'react-router-dom'


class Layout extends React.Component {
  state = {
    showInstallPwaArea: false,
  }

  togglePwaArea = e => {
    const { showInstallPwaArea } = this.state;
    this.setState({ showInstallPwaArea: !showInstallPwaArea })
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { showInstallPwaArea } = this.state;

    return (
      <Route
        {...rest}
        render={props => (
          <div className='App-wrapper' >
            <InstallButton showAddInstallBtn={showInstallPwaArea} togglePwaArea={this.togglePwaArea} />
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
    window.addEventListener('beforeinstallprompt', this.promptEventManagement)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.promptEventManagement)
  }

  promptEventManagement = e => {
    // Object that will gather changes for state
    let newChangesObj = {}
    // Prevent Chrome v67 or earlier from auto showing the prompt
    e.preventDefault()
    // Stash the event for later usage
    newChangesObj.deferredPrompt = e
    // Update the UI to indicate to user that they can add to the home screen
    // newChangesObj.showAddInstallBtn = true
    this.props.togglePwaArea()

    this.setState(newChangesObj)
  }

  handleInstallBtnClick = e => {
    const { deferredPrompt } = this.state;
    // Object that will gather changes for state
    let newChangesObj = {}
    // Hide the button
    // newChangesObj.showAddInstallBtn = false
    this.props.togglePwaArea()
    // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice()
      .then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User has green lit the installation of this PWA! Woohoo!')
          // They accepted.  Do your stuff?
        } else {
          console.log("User says shut it down, son.  No PWA install today :'(")
          // They denied; wait till the next 'beforeinstallprompt' event is fired on the next page navigation
        }
        newChangesObj.deferredPrompt = null
        this.setState(newChangesObj)
      })
      .catch(err => {
        console.log(`There was an error with the userChoice(): ${err}`)
        newChangesObj.deferredPrompt = null
        this.setState(newChangesObj)
      })
  }

  render() {
    const { showAddInstallBtn } = this.props;

    return (
      <div className={`add-pwa-btn-wrapper ${showAddInstallBtn ? 'show-pwa-install-btn' : ''}`}>
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
