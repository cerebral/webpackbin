import sandboxLoaded from './signals/sandboxLoaded'
import binLogged from './signals/binLogged'
import hashUpdated from './signals/hashUpdated'
import hashChanged from './signals/hashChanged'
import hashSubmitted from './signals/hashSubmitted'
import historyChanged from './signals/historyChanged'

export default {
  state: {
    isUpdatingSandbox: false,
    isLoadingSandbox: false,
    showIsPackaging: false,
    showIsLoadingSandbox: false,
    hash: null,
    lastNavigation: null
  },
  signals: {
    sandboxLoaded,
    binLogged,
    hashUpdated,
    hashChanged,
    hashSubmitted,
    historyChanged
  }
}
