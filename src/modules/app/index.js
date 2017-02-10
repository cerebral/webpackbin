import clicked from './signals/clicked'
import routed from './signals/routed'
import binRouted from './signals/binRouted'
import authenticate from './factories/authenticate'
import mainMenuButtonClicked from './signals/mainMenuButtonClicked'
import profileClicked from './signals/profileClicked'
import createBinClicked from './signals/createBinClicked'

export default {
  state: {
    isAuthenticating: true,
    snackbar: null,
    user: null,
    mainMenuIsOpened: false,
    profileMenuIsOpened: false
  },
  signals: {
    clicked,
    mainMenuButtonClicked,
    profileClicked,
    createBinClicked,
    routed: authenticate(routed),
    binRouted: authenticate(binRouted)
  }
}
