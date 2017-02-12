import {when, set, unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  when(state`bin.currentBin.loaders.${props`loaderName`}`), {
    true: [
      unset(state`bin.currentBin.loaders.${props`loaderName`}`)
    ],
    false: [
      set(state`bin.currentBin.loaders.${props`loaderName`}`, true)
    ]
  }
]
