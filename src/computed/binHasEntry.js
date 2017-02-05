import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(state`bin.files.list`, function (files) {
  return Boolean(files.filter(function (file) {
    return file.isEntry
  }).length)
})
