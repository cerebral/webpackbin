import sandboxLoaded from './signals/sandboxLoaded'
import binLogged from './signals/binLogged'

export default {
  state: {
    isUpdatingSandbox: false,
    isLoadingSandbox: false,
    showIsPackaging: false,
    showIsLoadingSandbox: false
  },
  signals: {
    sandboxLoaded,
    binLogged
  }
}
