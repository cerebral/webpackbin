import routed from './signals/routed'
import saveShortcutPressed from './signals/saveShortcutPressed'
import codeChanged from './signals/codeChanged'
import codeLinted from './signals/codeLinted'
import linterLoading from './signals/linterLoading'
import linterLoaded from './signals/linterLoaded'
import cursorChanged from './signals/cursorChanged'

import files from './modules/files'

export default {
  state: {
    isLoading: true,
    isUpdating: false,
    isLinting: false,
    lastSaveDatetime: null
  },
  signals: {
    routed,
    saveShortcutPressed,
    codeChanged,
    codeLinted,
    linterLoading,
    linterLoaded,
    cursorChanged
  },
  modules: {
    files
  }
}
