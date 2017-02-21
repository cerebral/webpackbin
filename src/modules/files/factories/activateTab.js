import updateFileIndexFactory from './updateFileIndex'
import fileClicked from '../signals/fileClicked'

export default (direction) => {
  return [
    updateFileIndexFactory(direction), {
      updated: fileClicked,
      noop: []
    }
  ]
}
