import {parallel} from 'cerebral'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'
import showSnackbar from '../factories/showSnackbar'
import whenLive from '../actions/whenLive'
import connectLiveBin from 'modules/live/chains/connectLiveBin'
import connectLiveBinAsOwner from 'modules/live/chains/connectLiveBinAsOwner'
import setCurrentBin from '../actions/setCurrentBin'
import isCurrentBinKey from '../factories/isCurrentBinKey'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import stopListeningToBinUpdates from 'modules/live/actions/stopListeningToBinUpdates'
import {set, when} from 'cerebral/operators'
import {state, props, string} from 'cerebral/tags'
import {value} from '@cerebral/firebase/operators'
import updateViewStats from '../actions/updateViewStats'
import listenToBinStatsUpdates from '../actions/listenToBinStatsUpdates'

export default [
  isCurrentBinKey(props`binKey`), {
    true: [
      updateSandbox(),
      set(state`app.isLoading`, false)
    ],
    false: [
      when(
        state`app.currentBin.isLive`,
        state`app.currentBinKey`,
        (isLive, currentBinKey) => isLive && currentBinKey
      ), {
        true: stopListeningToBinUpdates,
        false: []
      },
      set(state`app.isLoading`, true),
      set(state`sandbox.isUpdatingSandbox`, true),
      value(string`bins.${props`binKey`}`), {
        success: [
          when(props`response.value`), {
            true: [
              set(state`app.currentBinKey`, props`binKey`),
              setCurrentBin,
              forceCodeUpdate,
              parallel([
                listenToBinStatsUpdates,
                whenLive, {
                  owner: connectLiveBinAsOwner,
                  participant: connectLiveBin,
                  otherwise: updateSandbox([
                    updateViewStats
                  ])
                }
              ])
            ],
            false: showSnackbar('This bin does not exist anymore, sorry', 5000, 'error')
          }
        ],
        error: showSnackbar('Unable to get BIN', 5000, 'error')
      }
    ]
  }
]
