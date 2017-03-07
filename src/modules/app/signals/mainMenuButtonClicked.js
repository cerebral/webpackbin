import {set, merge} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import {value} from 'cerebral-provider-firebase/operators'

export default [
  set(state`app.isMainMenuOpen`, true),
  value('stats.total'), {
    success: [
      merge(state`app.stats`, props`value`)
    ],
    error: []
  }
]
