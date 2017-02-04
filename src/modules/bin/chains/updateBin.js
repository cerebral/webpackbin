import updateBin from '../actions/updateBin'
import setLastSavedDatetime from '../actions/setLastSavedDatetime'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.isUpdating`, true),
  updateBin, {
    success: [
      setLastSavedDatetime
    ],
    error: []
  },
  set(state`bin.isUpdating`, false)
]
