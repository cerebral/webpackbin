import {parallel} from 'cerebral'
import updateSandbox from '../actions/updateSandbox'
import {set, debounce, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from 'modules/app/actions/setLastSavedDatetime'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import resetLogs from 'modules/log/actions/resetLogs'

const isLoadingOrUpdating = when(
  state`sandbox.isLoadingSandbox`,
  state`sandbox.isUpdatingSandbox`,
  (isLoadingSandbox, isUpdatingSandbox) => isLoadingSandbox || isUpdatingSandbox
)

export default function updateSandboxFactory (additionalChain = []) {
  return [
    set(state`sandbox.isUpdatingSandbox`, true),
    resetLogs,
    parallel([
      debounce(500), {
        continue: [
          isLoadingOrUpdating, {
            true: set(state`sandbox.showIsLoadingSandbox`, true),
            false: set(state`sandbox.showIsLoadingSandbox`, false)
          }
        ],
        discard: []
      },
      debounce(2500), {
        continue: [
          isLoadingOrUpdating, {
            true: set(state`sandbox.showIsPackaging`, true),
            false: set(state`sandbox.showIsPackaging`, false)
          }
        ],
        discard: []
      },
      updateSandbox, {
        success: [
          setLastSavedDatetime,
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, true),
          updateFirebaseBin('lastSavedDatetime')
        ],
        error: [
          set(state`sandbox.isUpdatingSandbox`, false),
          showSnackbar('Unable to update sandbox', 5000, 'error')
        ]
      },
      additionalChain
    ])
  ]
}
