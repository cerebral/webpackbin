function whenLive({ state, path }) {
  const userUid = state.get('app.user.uid');
  const bin = state.get('app.currentBin');

  if (bin.isLive) {
    return bin.owner === userUid ? path.owner() : path.participant();
  }

  return path.otherwise();
}

export default whenLive;
