import showSnackbar from './showSnackbar'
import {getUser, signInAnonymously, value} from 'cerebral-provider-firebase'
import setSettings from 'modules/settings/actions/setSettings'
import {set, when} from 'cerebral/operators'
import {state, props, string} from 'cerebral/tags'

export default function (continueChain) {
  return [
    when(state`app.user`), {
      true: [
        ...continueChain
      ],
      false: [
        getUser(), {
          success: [
            when(props`user`), {
              true: [
                value(string`settings.${props`user.uid`}`), {
                  success: [
                    set(state`app.isAuthenticating`, false),
                    set(state`app.user`, props`user`),
                    setSettings,
                    ...continueChain
                  ],
                  error: [
                    ...showSnackbar('Unable to load your settings', 5000, 'error')
                  ]
                }
              ],
              false: [
                signInAnonymously(), {
                  success: [
                    set(state`app.isAuthenticating`, false),
                    set(state`app.user`, props`user`),
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
