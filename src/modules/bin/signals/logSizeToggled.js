import {toggle} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from '../factories/updateFirebaseBin'

export default [
  toggle(state`bin.currentBin.showFullLog`),
  ...updateFirebaseBin('showFullLog')
]
