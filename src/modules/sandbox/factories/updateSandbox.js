import {parallel} from 'cerebral'
import updateSandbox from '../actions/updateSandbox'
import {set} from 'cerebral/operators'
import sandboxDebounce from '../sandboxDebounce'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from 'modules/app/actions/setLastSavedDatetime'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import resetLogs from 'modules/log/actions/resetLogs'

export default function updateSandboxFactory (additionalChain = []) {
  return [
    set(state`sandbox.isUpdatingSandbox`, true),
    resetLogs,
    parallel([
      sandboxDebounce(500), {
        continue: [
          set(state`sandbox.sandboxMessage`, 'Sending update...'),
          sandboxDebounce(2000), {
            continue: [
              set(state`sandbox.sandboxMessage`, 'Waiting for packager, hold on...'),
              sandboxDebounce(15000), {
                continue: [
                  set(state`sandbox.sandboxMessage`, 'Still waiting, you probably added a rather large package...'),
                  sandboxDebounce(15000), {
                    continue: set(state`sandbox.sandboxMessage`, 'It can actually take up to a minute to package up, please hold on some more...'),
                    discard: []
                  }
                ],
                discard: []
              }
            ],
            discard: []
          }
        ],
        discard: []
      },
      updateSandbox, {
        success: [
          setLastSavedDatetime,
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, true),
          sandboxDebounce(0), {
            continue: set(state`sandbox.sandboxMessage`, 'Loading sandbox...'),
            discard: []
          },
          updateFirebaseBin('lastSavedDatetime')
        ],
        error: [
          sandboxDebounce(0), {
            continue: set(state`sandbox.sandboxMessage`, 'Loading sandbox...'),
            discard: []
          },
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, false),
          set(state`sandbox.sandboxMessage`, null),
          set(state`app.isLoading`, false),
          showSnackbar('Sorry, something went wrong, please report or refresh', 5000, 'error')
        ]
      },
      additionalChain
    ])
  ]
}
