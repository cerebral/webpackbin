import updateSandbox from 'modules/bin/chains/updateSandbox'
import showSnackbar from '../factories/showSnackbar'
import whenLive from 'modules/bin/actions/whenLive'
import connectLiveBin from 'modules/bin/chains/connectLiveBin'
import connectLiveBinAsOwner from 'modules/bin/chains/connectLiveBinAsOwner'
import setCurrentBin from 'modules/bin/actions/setCurrentBin'
import isCurrentBinKey from 'modules/bin/factories/isCurrentBinKey'
import forceCodeUpdate from 'modules/bin/actions/forceCodeUpdate'
import stopListeningToBinUpdates from 'modules/bin/actions/stopListeningToBinUpdates'
import {set, when} from 'cerebral/operators'
import {state, props, string} from 'cerebral/tags'
import {value} from 'cerebral-provider-firebase'

export default [
  isCurrentBinKey(props`binKey`), {
    true: [
      ...updateSandbox,
      set(state`bin.isLoading`, false)
    ],
    false: [
      when(
        state`bin.currentBin.isLive`,
        state`bin.currentBinKey`,
        (isLive, currentBinKey) => isLive && currentBinKey
      ), {
        true: [
          stopListeningToBinUpdates
        ],
        false: []
      },
      set(state`bin.isLoading`, true),
      set(state`bin.isUpdatingSandbox`, true),
      value(string`bins.${props`binKey`}`), {
        success: [
          when(props`value`), {
            true: [
              set(state`bin.currentBinKey`, props`binKey`),
              setCurrentBin,
              forceCodeUpdate,
              whenLive, {
                owner: [
                  ...connectLiveBinAsOwner
                ],
                participant: [
                  ...connectLiveBin
                ],
                otherwise: [
                  ...updateSandbox
                ]
              }
            ],
            false: [
              ...showSnackbar('This bin does not exist anymore, sorry', 5000, 'error')
            ]
          }
        ],
        error: [
          ...showSnackbar('Unable to get BIN', 5000, 'error')
        ]
      }
    ]
  }
]
