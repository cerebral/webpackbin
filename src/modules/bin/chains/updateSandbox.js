import updateSandbox from '../actions/updateSandbox'
import setLastSavedDatetime from '../actions/setLastSavedDatetime'
import {set, debounce, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  set(state`bin.isUpdatingSandbox`, true),
  [
    debounce(1500), {
      continue: [
        when(state`bin.isUpdatingSandbox`), {
          true: [
            set(state`bin.isPackaging`, true)
          ],
          false: [
            set(state`bin.isPackaging`, false)
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
        set(state`bin.isPackaging`, false)
      ],
      error: [
        set(state`bin.isUpdatingSandbox`, false),
        ...showSnackbar('Unable to update sandbox', 5000, 'error')
      ]
    }
  ]
]
