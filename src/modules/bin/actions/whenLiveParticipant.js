import {when} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default when(
  state`bin.currentBin.isLive`,
  state`bin.currentBin.currentParticipantKey`,
  state`app.user.uid`,
  (isLive, currentParticipantKey, userUid) => isLive && currentParticipantKey !== userUid
)
