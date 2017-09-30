function addToFavorites({ state, firebase, path }) {
  const userUid = state.get('app.user.uid');
  const favorite = {
    name: state.get('favorites.newMyBinTitle'),
    binKey: state.get('app.currentBinKey'),
    datetime: Date.now(),
  };

  return firebase
    .push(`favorites.${userUid}`, favorite)
    .then(({ key }) => {
      return path.success({
        key,
        favorite,
      });
    })
    .catch(path.error);
}

export default addToFavorites;
