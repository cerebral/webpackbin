import {createNewBin} from 'utils'
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
import saveClicked from './signals/saveClicked'
import newBinClicked from './signals/newBinClicked'
import copyBinClicked from './signals/copyBinClicked'
import preventWhenLiveParticipant from './factories/preventWhenLiveParticipant'

export default {
  state: {
    isAuthenticating: true,
    snackbar: null,
    currentBinKey: null,
    currentBin: createNewBin(),
    isLoading: true,
    isSaving: false,
    user: null,
    isMainMenuOpen: false,
    isProfileMenuOpen: false,
    showGithubSignIn: false,
    profileMenuPage: null
  },
  signals: {
    routed: authenticate(routed),
    binRouted: authenticate(binRouted),
    saveClicked: preventWhenLiveParticipant(saveClicked),
    clicked,
    mainMenuButtonClicked,
    profileClicked,
    createBinClicked,
    githubSignInClicked,
    githubSignUpClicked,
    githubConvertClicked,
    githubSignInAborted,
    signOutClicked,
    newBinClicked,
    copyBinClicked
  }
}
