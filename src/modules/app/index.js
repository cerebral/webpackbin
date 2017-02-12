import clicked from './signals/clicked'
import routed from './signals/routed'
import binRouted from './signals/binRouted'
import authenticate from './factories/authenticate'
import leftMenuButtonClicked from './signals/leftMenuButtonClicked'
import avatarClicked from './signals/avatarClicked'
import createBinClicked from './signals/createBinClicked'
import githubSignInClicked from './signals/githubSignInClicked'

export default {
  state: {
    isAuthenticating: true,
    snackbar: null,
    user: null,
    leftMenuIsOpened: false,
    profileMenuIsOpened: false
  },
  signals: {
    clicked,
    leftMenuButtonClicked,
    avatarClicked,
    createBinClicked,
    routed: authenticate(routed),
    binRouted: authenticate(binRouted),
    githubSignInClicked
  }
}
