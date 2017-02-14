import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import PopoverIconButton from 'common/components/PopoverIconButton'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Quickstart from './Quickstart'
import Packages from './Packages'
import Loaders from './Loaders'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  showConfiguration: state`app.currentBin.showConfiguration`,
  quickstarts: state`configure.quickstarts`,
  configurationClicked: signal`configure.configurationClicked`,
  quickstartClicked: signal`configure.quickstartClicked`
},
  function Configure ({
    liveStatus,
    showConfiguration,
    quickstarts,
    configurationClicked,
    quickstartClicked
  }) {
    return (
      <PopoverIconButton
        disabled={!liveStatus.isAdmin || liveStatus.isParticipant}
        show={showConfiguration}
        icon='npm'
        label='Configure'
        onClick={(event) => {
          event.stopPropagation()
          configurationClicked()
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.column}>
            <div className={styles.header}>
              Quick start
            </div>
            <Quickstart />
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              Add NPM package
            </div>
            <Packages />
          </div>
          <div className={styles.column2}>
            <div className={styles.header}>
              Loaders
            </div>
            <Loaders />
          </div>
        </div>
      </PopoverIconButton>
    )
  }
)
