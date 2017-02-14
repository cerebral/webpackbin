import {signInWithGithub} from 'cerebral-provider-firebase'
import {set, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from '../factories/showSnackbar'

export default [
  set(state`app.isSigningIn`, true),
  signInWithGithub(), {
    success: [
      set(state`app.user`, props`user`),
      set(state`app.showGithubSignIn`, false),
      set(state`app.isSigningIn`, false),
      when(state`app.currentBinKey`), {
        true: [],
        false: [
          set(state`app.currentBin.owner`, state`app.user.uid`)
        ]
      },
      ...showSnackbar('Signed in', 5000)
    ],
    error: [
      set(state`app.isSigningIn`, false),
      ...showSnackbar('Was not able to sign you in with Github, sorry', 5000, 'error')
    ]
  }
]
