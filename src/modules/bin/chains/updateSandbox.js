import updateSandbox from '../actions/updateSandbox'
import setLastSavedDatetime from '../actions/setLastSavedDatetime'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.isUpdatingSandbox`, true),
  updateSandbox, {
    success: [
      setLastSavedDatetime
    ],
    error: []
  },
  set(state`bin.isUpdatingSandbox`, false)
]
