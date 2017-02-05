import defaultIndexHtml from './defaultIndexHtml'
import routed from './signals/routed'
import saveShortcutPressed from './signals/saveShortcutPressed'
import codeChanged from './signals/codeChanged'
import fileClicked from './signals/fileClicked'
import removeFileClicked from './signals/removeFileClicked'
import codeLinted from './signals/codeLinted'
import linterLoading from './signals/linterLoading'
import linterLoaded from './signals/linterLoaded'

export default {
  state: {
    isLoading: true,
    isUpdating: false,
    isLinting: false,
    lastSaveDatetime: null,
    selectedFileIndex: 0,
    files: [{
      name: 'index.html',
      content: defaultIndexHtml
    }, {
      name: 'main.js',
      isEntry: true,
      content: 'console.log("woop")'
    }]
  },
  signals: {
    routed,
    saveShortcutPressed,
    codeChanged,
    fileClicked,
    removeFileClicked,
    codeLinted,
    linterLoading,
    linterLoaded
  }
}
