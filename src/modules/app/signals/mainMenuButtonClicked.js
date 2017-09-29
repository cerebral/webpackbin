import {set, merge} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import {value} from '@cerebral/firebase/operators'
import closeAllMenues from '../chains/closeAllMenues'

export default [
  closeAllMenues,
  set(state`app.isMainMenuOpen`, true),
  value('stats.total'), {
    success: [
      merge(state`app.stats`, props`response.value`)
    ],
    error: []
  }
]
