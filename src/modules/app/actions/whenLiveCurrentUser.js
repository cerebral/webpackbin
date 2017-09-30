import { when } from 'cerebral/operators';
import { state } from 'cerebral/tags';

export default when(
  state`app.currentBin.currentParticipantKey`,
  state`app.user.uid`,
  (currentParticipantKey, userUid) => currentParticipantKey === userUid
);
