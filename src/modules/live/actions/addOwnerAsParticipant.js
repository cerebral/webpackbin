function addOwnerAsParticipant ({state}) {
  state.set('app.currentBin.participants', {
    [state.get('app.user.uid')]: state.get('app.user.providerData.0.displayName') || 'Anonymous'
  })
}

export default addOwnerAsParticipant
