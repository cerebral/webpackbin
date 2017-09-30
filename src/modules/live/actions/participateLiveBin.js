import { createAnonymousUsername } from 'utils';

function participateLiveBin({ state, firebase, path }) {
  const binKey = state.get('app.currentBinKey');
  const user = state.get('app.user');
  const displayName = user.providerData.length
    ? user.providerData[0].displayName
    : createAnonymousUsername();

  state.set(`app.currentBin.participants.${user.uid}`, displayName);

  return firebase
    .set(`bins.${binKey}.participants.${user.uid}`, displayName)
    .then(path.success)
    .catch(path.error);
}

export default participateLiveBin;
