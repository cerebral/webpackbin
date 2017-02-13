import {createNewBin} from 'utils'
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
import liveToggled from './signals/liveToggled'
import liveBinChanged from './signals/liveBinChanged'
import liveCodeChanged from './signals/liveCodeChanged'
import participantClicked from './signals/participantClicked'
import logPathSelected from './signals/logPathSelected'
import newBinClicked from './signals/newBinClicked'
import copyBinClicked from './signals/copyBinClicked'

import files from './modules/files'
import configure from './modules/configure'

import preventWhenLiveParticipant from './factories/preventWhenLiveParticipant'

export default {
  state: {
    currentBinKey: null,
    currentBin: createNewBin(),
    liveBin: null,
    isLoading: true,
    isUpdatingSandbox: false,
    isLoadingSandbox: false,
    showIsPackaging: false,
    showIsLoadingSandbox: false,
    isSaving: false,
    isLinting: false,
    lastForceCodeUpdate: null,
    saveWhenDoneLinting: false,
    shouldCheckLog: false,
    logs: []
  },
  signals: {
    saveClicked: preventWhenLiveParticipant(saveClicked),
    codeChanged: preventWhenLiveParticipant(codeChanged),
    codeLinted,
    linterLoading,
    linterLoaded,
    cursorChanged: preventWhenLiveParticipant(cursorChanged),
    configurationClicked: preventWhenLiveParticipant(configurationClicked),
    sandboxLoaded,
    logSizeToggled: preventWhenLiveParticipant(logSizeToggled),
    binLogged,
    logValueToggled: preventWhenLiveParticipant(logValueToggled),
    logToggled: preventWhenLiveParticipant(logToggled),
    liveToggled: preventWhenLiveParticipant(liveToggled),
    liveBinChanged,
    liveCodeChanged,
    participantClicked,
    logPathSelected: preventWhenLiveParticipant(logPathSelected),
    newBinClicked,
    copyBinClicked
  },
  modules: {
    files,
    configure
  }
}
