import {parallel} from 'cerebral'
import updateSandbox from '../actions/updateSandbox'
import {set, when} from 'cerebral/operators'
import sandboxDebounce from '../sandboxDebounce'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from 'modules/app/actions/setLastSavedDatetime'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import resetLogs from 'modules/log/actions/resetLogs'
import sandboxTimeout from '../chains/sandboxTimeout'
import sandboxAborted from '../chains/sandboxAborted'
import abortSandboxUpdate from '../actions/abortSandboxUpdate'

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
              sandboxDebounce(22500), {
                continue: abortSandboxUpdate,
                discard: []
              }
            ],
            discard: []
          }
        ],
        discard: []
      },
      updateSandbox, {
        503: sandboxTimeout,
        0: sandboxAborted,
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
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, false),
          set(state`sandbox.sandboxMessage`, null),
          set(state`app.isLoading`, false),
          showSnackbar('Unable to update sandbox', 5000, 'error')
        ]
      },
      additionalChain
    ])
  ]
}
