import updateSandbox from '../actions/updateSandbox'
import {set, debounce, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from '../actions/setLastSavedDatetime'
import updateFirebaseBin from '../factories/updateFirebaseBin'
import resetLogs from '../actions/resetLogs'

export default [
  set(state`bin.isUpdatingSandbox`, true),
  resetLogs,
  [
    debounce(500), {
      continue: [
        when(state`bin.isLoadingSandbox`), {
          true: [
            set(state`bin.showIsLoadingSandbox`, true)
          ],
          false: [
            set(state`bin.showIsLoadingSandbox`, false)
          ]
        }
      ],
      discard: []
    },
    debounce(2000), {
      continue: [
        when(state`bin.isLoadingSandbox`), {
          true: [
            set(state`bin.showIsPackaging`, true)
          ],
          false: [
            set(state`bin.showIsPackaging`, false)
          ]
        }
      ],
      discard: []
    },
    updateSandbox, {
      success: [
        setLastSavedDatetime,
        set(state`bin.isUpdatingSandbox`, false),
        set(state`bin.isLoadingSandbox`, true),
        ...updateFirebaseBin('lastSavedDatetime')
      ],
      error: [
        set(state`bin.isUpdatingSandbox`, false),
        ...showSnackbar('Unable to update sandbox', 5000, 'error')
      ]
    }
  ]
]
