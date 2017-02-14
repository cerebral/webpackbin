import logSizeToggled from './signals/logSizeToggled'
import logValueToggled from './signals/logValueToggled'
import logToggled from './signals/logToggled'
import logPathSelected from './signals/logPathSelected'
import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'

export default {
  state: {
    shouldCheckLog: false,
    list: []
  },
  signals: {
    logSizeToggled: preventWhenLiveParticipant(logSizeToggled),
    logValueToggled: preventWhenLiveParticipant(logValueToggled),
    logToggled: preventWhenLiveParticipant(logToggled),
    logPathSelected: preventWhenLiveParticipant(logPathSelected)
  }
}
