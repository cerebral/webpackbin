import showSnackbar from './showSnackbar'
import {getUser, signInAnonymously} from 'cerebral-provider-firebase'
import {set, when} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default function (continueChain) {
  return [
    when(state`app.user`), {
      true: [
        ...continueChain
      ],
      false: [
        getUser(), {
          success: [
            when(input`user`), {
              true: [
                set(state`app.isAuthenticating`, false),
                set(state`app.user`, input`user`),
                ...continueChain
              ],
              false: [
                signInAnonymously(), {
                  success: [
                    set(state`app.isAuthenticating`, false),
                    set(state`app.user`, input`user`),
                    ...continueChain
                  ],
                  error: [
                    ...showSnackbar('An error occured creating you an anonymous account')
                  ]
                }
              ]
            }
          ],
          error: [
            ...showSnackbar('An error occured during authentication')
          ]
        }
      ]
    }
  ]
}
