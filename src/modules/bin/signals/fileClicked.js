import {set} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  set(state`bin.selectedFileIndex`, input`index`)
]
