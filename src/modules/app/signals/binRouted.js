import updateSandbox from 'modules/bin/chains/updateSandbox'
import showSnackbar from '../factories/showSnackbar'
import listenToBinUpdates from 'modules/bin/actions/listenToBinUpdates'
import whenLive from 'modules/bin/actions/whenLive'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'
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
          set(state`bin.currentBinKey`, props`binKey`),
          setCurrentBin,
          forceCodeUpdate,
          whenLive, {
            owner: [
              listenToBinUpdates,
              ...updateFirebaseBin([
                'isLive',
                'currentParticipantKey',
                'participants'
              ], {
                success: [
                  ...updateSandbox,
                  set(state`bin.isLoading`, false),
                  ...showSnackbar('Live session created, awaiting connections...', 5000)
                ],
                error: [
                  ...showSnackbar('Unable to create live session', 5000, 'error')
                ],
                notAllowed: []
              })
            ],
            participant: [
              ...connectLiveBin
            ],
            otherwise: [
              ...updateSandbox
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
