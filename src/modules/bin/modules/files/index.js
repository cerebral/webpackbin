import defaultIndexHtml from './defaultIndexHtml'
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
    list: [{
      name: 'index.html',
      content: defaultIndexHtml,
      lastCursorPosition: {
        line: 0,
        ch: 0
      }
    }],
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
