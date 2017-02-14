import {when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  when(state`settings.lint`), {
    true: [
      ...showSnackbar('Mode and linter loaded', 4000)
    ],
    false: [
      ...showSnackbar('Mode loaded', 4000)
    ]
  }
]
