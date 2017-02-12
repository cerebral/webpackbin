function addOwnerAsParticipant ({state}) {
  state.set('bin.currentBin.participants', {
    [state.get('app.user.uid')]: state.get('app.user.providerData.0.displayName')
  })
}

export default addOwnerAsParticipant
