import {when, set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  set(state`code.hasLinter`, props`hasLinter`),
  when(props`modeAlreadyLoaded`), {
    true: [],
    false: [
      when(
        state`settings.lint`,
        props`hasLinter`,
        (lint, hasLinter) => lint && hasLinter
      ), {
        true: [
          ...showSnackbar('Mode and linter loaded', 4000)
        ],
        false: [
          ...showSnackbar('Mode loaded', 4000)
        ]
      }
    ]
  }
]
