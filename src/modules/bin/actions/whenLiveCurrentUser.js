import {when} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default when(
  state`liveBin.currentParticipantKey`,
  state`user.uid`,
  (currentParticipantKey, userUid) => currentParticipantKey === userUid
)
