import showSnackbar from './showSnackbar'
import {getUser, signInAnonymously, value} from 'cerebral-provider-firebase'
import setSettings from 'modules/settings/actions/setSettings'
import setMyBins from 'modules/myBins/actions/setMyBins'
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
                [
                  value(string`settings.${props`user.uid`}`), {
                    success: [
                      setSettings
                    ],
                    error: [
                      ...showSnackbar('Unable to load your settings', 5000, 'error')
                    ]
                  },
                  value(string`myBins.${props`user.uid`}`), {
                    success: [
                      setMyBins
                    ],
                    error: [
                      ...showSnackbar('Unable to load your bins', 5000, 'error')
                    ]
                  }
                ],
                set(state`app.isAuthenticating`, false),
                set(state`app.user`, props`user`),
                ...continueChain
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
