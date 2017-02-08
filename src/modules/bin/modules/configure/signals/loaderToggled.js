import {when, set, unset} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  when(state`bin.currentBin.loaders.${input`loaderName`}`), {
    true: [
      unset(state`bin.currentBin.loaders.${input`loaderName`}`)
    ],
    false: [
      set(state`bin.currentBin.loaders.${input`loaderName`}`, true)
    ]
  }
]
