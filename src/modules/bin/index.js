import routed from './signals/routed'
import saveShortcutPressed from './signals/saveShortcutPressed'
import codeChanged from './signals/codeChanged'
import defaultIndexHtml from './defaultIndexHtml'

export default {
  state: {
    isLoading: true,
    isUpdating: false,
    lastSaveDatetime: null,
    selectedFileIndex: 0,
    files: [{
      name: 'index.html',
      content: defaultIndexHtml
    }]
  },
  signals: {
    routed,
    saveShortcutPressed,
    codeChanged
  }
}
