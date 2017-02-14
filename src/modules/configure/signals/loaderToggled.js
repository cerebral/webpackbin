import {when, set, unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  when(state`app.currentBin.loaders.${props`loaderName`}`), {
    true: [
      unset(state`app.currentBin.loaders.${props`loaderName`}`)
    ],
    false: [
      set(state`app.currentBin.loaders.${props`loaderName`}`, true)
    ]
  }
]
