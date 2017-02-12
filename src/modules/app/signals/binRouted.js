import updateSandbox from 'modules/bin/chains/updateSandbox'
import showSnackbar from '../factories/showSnackbar'
import connectLiveBin from 'modules/bin/chains/connectLiveBin'
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
      ...updateSandbox
    ],
    false: [
      when(state`bin.currentBin.isLive`), {
        true: [
          stopListeningToBinUpdates
        ],
        false: []
      },
      set(state`bin.isLoading`, true),
      set(state`bin.isUpdatingSandbox`, true),
      value(string`bins.${props`binKey`}`), {
        success: [
          setCurrentBin,
          forceCodeUpdate,
          when(state`bin.currentBin.isLive`), {
            true: [
              ...connectLiveBin
            ],
            false: [
              ...updateSandbox
            ]
          }
        ],
        error: [
          ...showSnackbar('Unable to get BIN', 5000, 'error')
        ]
      },
      set(state`bin.isLoading`, false)
    ]
  }
]
