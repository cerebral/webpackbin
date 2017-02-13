import {when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  when(state`settings.lint`), {
    true: [
      ...showSnackbar('Loading mode and linter...')
    ],
    false: [
      ...showSnackbar('Loading mode...')
    ]
  }
]
