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
import myBinsClicked from './signals/myBinsClicked'
import myBinsTitleAborted from './signals/myBinsTitleAborted'
import myBinsTitleChanged from './signals/myBinsTitleChanged'
import myBinsTitleSubmitted from './signals/myBinsTitleSubmitted'
import myBinClicked from './signals/myBinClicked'

export default {
  state: {
    isAuthenticating: true,
    snackbar: null,
    user: null,
    myBins: {},
    showMyBinsTitleInput: false,
    myBinsTitle: '',
    isMainMenuOpen: false,
    isProfileMenuOpen: false,
    showGithubSignIn: false,
    profileMenuPage: null
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
    signOutClicked,
    myBinsClicked,
    myBinsTitleAborted,
    myBinsTitleChanged,
    myBinsTitleSubmitted,
    myBinClicked
  }
}
