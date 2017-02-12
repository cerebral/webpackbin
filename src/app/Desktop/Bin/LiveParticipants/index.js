import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'
import classnames from 'classnames'

export default connect({
  participants: state`bin.currentBin.participants`,
  userKey: state`app.user.uid`,
  currentParticipantKey: state`bin.currentBin.currentParticipantKey`,
  ownerKey: state`bin.currentBin.owner`,
  participantClicked: signal`bin.participantClicked`
},
  function LiveParticipants ({
    participants,
    userKey,
    ownerKey,
    currentParticipantKey,
    participantClicked
  }) {
    const isOwner = ownerKey === userKey

    return (
      <div className={styles.wrapper}>
        {Object.keys(participants || {}).map((participantKey, index) => {
          const isActive = participantKey === currentParticipantKey

          return (
            <div
              key={index}
              className={classnames(styles.user, {
                [styles.active]: isActive,
                [styles.owner]: isOwner
              })}
              onClick={isOwner ? () => participantClicked({
                participantKey
              }) : null}>
              {participants[participantKey]}
            </div>
          )
        })}
      </div>
    )
  }
)
