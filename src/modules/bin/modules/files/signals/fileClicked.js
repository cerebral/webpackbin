import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'

export default [
  set(state`bin.currentBin.selectedFileIndex`, props`index`),
  ...updateFirebaseBin('selectedFileIndex')
]
