import showSnackbar from './showSnackbar'
import {getUser, signInAnonymously} from 'cerebral-provider-firebase/operators'
import {set, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import setUserRelatedData from '../chains/setUserRelatedData'

export default function (continueChain) {
  return [
    when(state`app.user`), {
      true: continueChain,
      false: [
        getUser(), {
          success: [
            when(props`user`), {
              true: [
                setUserRelatedData,
                set(state`app.isAuthenticating`, false),
                set(state`app.user`, props`user`),
                continueChain
              ],
              false: [
                signInAnonymously(), {
                  success: [
                    set(state`app.isAuthenticating`, false),
                    set(state`app.user`, props`user`),
                    continueChain
                  ],
                  error: showSnackbar('An error occured creating you an anonymous account')
                }
              ]
            }
          ],
          error: showSnackbar('An error occured during authentication')
        }
      ]
    }
  ]
}
