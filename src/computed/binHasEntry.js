import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(state`bin.currentBin.files`, function (files) {
  return Boolean(files.filter(function (file) {
    return file.isEntry
  }).length)
})
