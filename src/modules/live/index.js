import liveToggled from './signals/liveToggled'
import liveBinChanged from './signals/liveBinChanged'
import liveCodeChanged from './signals/liveCodeChanged'
import participantClicked from './signals/participantClicked'

import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'

export default {
  signals: {
    liveToggled: preventWhenLiveParticipant(liveToggled),
    liveBinChanged,
    liveCodeChanged,
    participantClicked
  }
}
