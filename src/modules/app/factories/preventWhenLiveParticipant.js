import whenLiveParticipant from '../actions/whenLiveParticipant'

function preventWhenLiveParticipant (continueChain) {
  return [
    whenLiveParticipant, {
      true: [],
      false: continueChain
    }
  ]
}

export default preventWhenLiveParticipant
