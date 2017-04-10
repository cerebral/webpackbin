import updateSandbox from '../actions/updateSandbox'
import {set, wait} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from 'modules/app/actions/setLastSavedDatetime'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import sandboxDebounce from '../sandboxDebounce'

const setErrorState = [
  set(state`sandbox.isUpdatingSandbox`, false),
  set(state`sandbox.isLoadingSandbox`, false),
  set(state`sandbox.sandboxMessage`, null),
  set(state`app.isLoading`, false)
]

export default [
  sandboxDebounce(0), {
    continue: [
      set(state`sandbox.sandboxMessage`, 'No available packager, will try again in 5...'),
      wait(5000),
      set(state`sandbox.sandboxMessage`, 'Trying to grab packages again...'),
      updateSandbox, {
        503: [
          setErrorState,
          showSnackbar('There are not any available packagers, we probably need to scale up, please let us know!', 5000, 'error')
        ],
        success: [
          setLastSavedDatetime,
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, true),
          updateFirebaseBin('lastSavedDatetime')
        ],
        error: [
          setErrorState,
          showSnackbar('Sorry, something wrong happened :(', 5000, 'error')
        ]
      }
    ],
    discard: []
  }
]
