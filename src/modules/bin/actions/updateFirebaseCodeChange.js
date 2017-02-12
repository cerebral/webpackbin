function updateFirebaseCodeChange ({props, state, firebase, path}) {
  const binKey = state.get('bin.currentBinKey')

  return firebase.push(`codeChanges.${binKey}`, props.codeChange)
    .then(path.success)
    .catch(path.error)
}

export default updateFirebaseCodeChange
