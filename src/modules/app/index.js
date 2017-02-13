import clicked from './signals/clicked'
import routed from './signals/routed'
import binRouted from './signals/binRouted'
import authenticate from './factories/authenticate'
import mainMenuButtonClicked from './signals/mainMenuButtonClicked'
import profileClicked from './signals/profileClicked'
import createBinClicked from './signals/createBinClicked'
import githubSignInClicked from './signals/githubSignInClicked'
import githubSignUpClicked from './signals/githubSignUpClicked'
import githubConvertClicked from './signals/githubConvertClicked'
import githubSignInAborted from './signals/githubSignInAborted'
import signOutClicked from './signals/signOutClicked'

export default {
  state: {
    isAuthenticating: true,
    snackbar: null,
    user: null,
    isMainMenuOpen: false,
    isProfileMenuOpen: false,
    showGithubSignIn: false
  },
  signals: {
    routed: authenticate(routed),
    binRouted: authenticate(binRouted),
    clicked,
    mainMenuButtonClicked,
    profileClicked,
    createBinClicked,
    githubSignInClicked,
    githubSignUpClicked,
    githubConvertClicked,
    githubSignInAborted,
    signOutClicked
  }
}
