import codeChanged from './signals/codeChanged'
import codeLinted from './signals/codeLinted'
import modeLoading from './signals/modeLoading'
import modeLoaded from './signals/modeLoaded'
import cursorChanged from './signals/cursorChanged'
import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'

export default {
  state: {
    isLinting: false,
    lastForceCodeUpdate: null,
    saveWhenDoneLinting: false,
    isValid: true
  },
  signals: {
    codeChanged: preventWhenLiveParticipant(codeChanged),
    codeLinted,
    modeLoading,
    modeLoaded,
    cursorChanged: preventWhenLiveParticipant(cursorChanged)
  }
}
