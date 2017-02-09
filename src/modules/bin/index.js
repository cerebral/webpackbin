import defaultIndexHtml from './defaultIndexHtml'

import saveClicked from './signals/saveClicked'
import codeChanged from './signals/codeChanged'
import codeLinted from './signals/codeLinted'
import linterLoading from './signals/linterLoading'
import linterLoaded from './signals/linterLoaded'
import cursorChanged from './signals/cursorChanged'
import configurationClicked from './signals/configurationClicked'
import sandboxLoaded from './signals/sandboxLoaded'
import logSizeToggled from './signals/logSizeToggled'
import binLogged from './signals/binLogged'
import logValueToggled from './signals/logValueToggled'
import logToggled from './signals/logToggled'

import files from './modules/files'
import configure from './modules/configure'

export default {
  state: {
    currentBin: {
      key: null,
      owner: null,
      title: '',
      packages: {},
      loaders: {},
      files: [{
        name: 'index.html',
        content: defaultIndexHtml,
        lastCursorPosition: {
          line: 0,
          ch: 0
        }
      }]
    },
    isLoading: true,
    isUpdatingSandbox: false,
    isLoadingSandbox: false,
    showIsPackaging: false,
    showIsLoadingSandbox: false,
    isSaving: false,
    isLinting: false,
    lastSavedDatetime: null,
    lastForceCodeUpdate: null,
    showConfiguration: false,
    saveWhenDoneLinting: false,
    logs: [],
    selectedLogPath: [],
    showLog: false,
    showFullLog: false,
    shouldCheckLog: false
  },
  signals: {
    saveClicked,
    codeChanged,
    codeLinted,
    linterLoading,
    linterLoaded,
    cursorChanged,
    configurationClicked,
    sandboxLoaded,
    logSizeToggled,
    binLogged,
    logValueToggled,
    logToggled
  },
  modules: {
    files,
    configure
  }
}
