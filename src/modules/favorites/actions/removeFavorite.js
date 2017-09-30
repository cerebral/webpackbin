function removeMyBin({ state, firebase, path }) {
  const userUid = state.get('app.user.uid');
  const currentBinKey = state.get('app.currentBinKey');
  const favorites = state.get('favorites.list');

  const favoriteKey = Object.keys(favorites).reduce((favoriteKeyMatch, key) => {
    if (favoriteKeyMatch) {
      return favoriteKeyMatch;
    }

    if (favorites[key].binKey === currentBinKey) {
      return key;
    }

    return favoriteKeyMatch;
  }, null);

  return firebase
    .set(`favorites.${userUid}.${favoriteKey}`, null)
    .then(() => {
      return path.success({
        favoriteKey,
      });
    })
    .catch(path.error);
}

export default removeMyBin;
