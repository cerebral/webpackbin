import sandboxLoaded from './signals/sandboxLoaded'
import binLogged from './signals/binLogged'
import urlUpdated from './signals/urlUpdated'
import urlChanged from './signals/urlChanged'
import urlSubmitted from './signals/urlSubmitted'
import historyChanged from './signals/historyChanged'

export default {
  state: {
    isUpdatingSandbox: false,
    isLoadingSandbox: false,
    showIsPackaging: false,
    showIsLoadingSandbox: false,
    url: null,
    lastNavigation: null
  },
  signals: {
    sandboxLoaded,
    binLogged,
    urlUpdated,
    urlChanged,
    urlSubmitted,
    historyChanged
  }
}
