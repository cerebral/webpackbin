import {when} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default when(
  state`app.currentBin.isLive`,
  state`app.currentBin.currentParticipantKey`,
  state`app.user.uid`,
  (isLive, currentParticipantKey, userUid) => isLive && currentParticipantKey !== userUid
)
