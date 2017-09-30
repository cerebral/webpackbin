function updateCurrentParticipantKey({ firebase, state, path, props }) {
  const binKey = state.get('app.currentBinKey');

  return firebase
    .set(`bins.${binKey}.currentParticipantKey`, props.participantKey)
    .then(path.success)
    .catch(path.error);
}

export default updateCurrentParticipantKey;
