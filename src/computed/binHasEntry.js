import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(state`app.currentBin.files`, function (files) {
  return Boolean(files.filter(function (file) {
    return file.isEntry
  }).length)
})
