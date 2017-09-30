import updateCurrentParticipantKey from '../actions/updateCurrentParticipantKey';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default [
  set(state`app.currentBin.currentParticipantKey`, props`participantKey`),
  updateCurrentParticipantKey,
  {
    success: [],
    false: [],
  },
];
