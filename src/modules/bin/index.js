import saveClicked from './signals/saveClicked'
import codeChanged from './signals/codeChanged'
import codeLinted from './signals/codeLinted'
import linterLoading from './signals/linterLoading'
import linterLoaded from './signals/linterLoaded'
import cursorChanged from './signals/cursorChanged'

import files from './modules/files'

export default {
  state: {
    currentBin: null,
    isLoading: true,
    isUpdatingSandbox: false,
    isSaving: false,
    isLinting: false,
    lastSaveDatetime: null
  },
  signals: {
    saveClicked,
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
