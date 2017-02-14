import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import isInMyBins from 'computed/isInMyBins'
import removeMyBin from '../chains/removeMyBin'

export default [
  when(isInMyBins), {
    true: [
      ...removeMyBin
    ],
    false: [
      set(state`myBins.showNewTitleInput`, true)
    ]
  }
]
