
const btnAddPwa = document.querySelector('.add-pwa-btn')
let deferredPrompt

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome v67 or earlier from auto showing the prompt
  e.preventDefault()
  // Stash the event for later usage
  deferredPrompt = e
  // Update the UI to indicate to user that they can add to the home screen
  btnAddPwa.style.display = 'block'
})

btnAddPwa.addEventListener('click', e => {
  // Hide the UI that shows our A2HS button
  btnAddPwa.style.display = 'none'
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
      deferredPrompt = null
    })
})

// Listen for when the user accepts app install
window.addEventListener('appinstalled', e => {
  console.log('"appinstalled" event fired off!')
})

// Using javascript to check the display-mode media query.
if(window.matchMedia('(display-mode: standalone)').matches) {
  console.log('The display-mode is standalone :)')
}

// Safari specific check for display-mode
if(window.navigator.standalone === true) {
  console.log("We're in display-mode on a Safari browser")
}
