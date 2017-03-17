import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import PopoverIconButton from 'common/components/PopoverIconButton'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Quickstart from './Quickstart'
import Packages from './Packages'
import Loaders from './Loaders'
import liveStatus from 'computed/liveStatus'
import Checkbox from 'common/components/Checkbox'

export default connect({
  liveStatus,
  forceNoLint: state`app.currentBin.forceNoLint`,
  showConfiguration: state`app.currentBin.showConfiguration`,
  quickstarts: state`configure.quickstarts`,
  configurationClicked: signal`configure.configurationClicked`,
  quickstartClicked: signal`configure.quickstartClicked`,
  forceNoLintToggled: signal`configure.forceNoLintToggled`
},
  function Configure ({
    liveStatus,
    forceNoLint,
    showConfiguration,
    quickstarts,
    configurationClicked,
    quickstartClicked,
    forceNoLintToggled
  }) {
    return (
      <PopoverIconButton
        disabled={!liveStatus.isAdmin || liveStatus.isParticipant}
        show={showConfiguration}
        icon='npm'
        right
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
            <div className={styles.header}>
              Settings
            </div>
            <Checkbox
              checked={forceNoLint}
              onChange={() => forceNoLintToggled()}
            >
              Force no linting
            </Checkbox>
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
