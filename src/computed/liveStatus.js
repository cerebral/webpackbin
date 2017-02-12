import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(
  state`app.user.uid`,
  state`bin.currentBin`,
  (uid, bin) => ({
    isParticipant: bin.isLive && bin.currentParticipantKey !== uid,
    isConnected: bin.isLive
  })
)
