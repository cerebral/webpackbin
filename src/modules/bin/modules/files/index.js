import fileClicked from './signals/fileClicked'
import removeFileClicked from './signals/removeFileClicked'
import isEntryToggled from './signals/isEntryToggled'
import newFileAborted from './signals/newFileAborted'
import newFileClicked from './signals/newFileClicked'
import newFileNameChanged from './signals/newFileNameChanged'
import newFileNameSubmitted from './signals/newFileNameSubmitted'

export default {
  state: {
    selectedFileIndex: 0,
    changedFiles: {},
    showNewFileInput: false,
    newFileName: '',
    newFileIsEntry: false
  },
  signals: {
    fileClicked,
    removeFileClicked,
    isEntryToggled,
    newFileAborted,
    newFileClicked,
    newFileNameChanged,
    newFileNameSubmitted
  }
}
