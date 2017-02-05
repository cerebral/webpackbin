import {set, debounce} from 'cerebral/operators'
import {state} from 'cerebral/tags'

const snackbarDebounce = debounce.shared()

function showSnackbar (text, ms) {
  if (!ms) {
    return [
      set(state`app.snackbarText`, text)
    ]
  }

  return [
    set(state`app.snackbarText`, text),
    snackbarDebounce(ms), {
      continue: [
        set(state`app.snackbarText`, null)
      ],
      discard: []
    }
  ]
}

export default showSnackbar
