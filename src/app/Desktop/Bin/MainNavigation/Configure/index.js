import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import PopoverIconButton from 'components/PopoverIconButton'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Quickstart from './Quickstart'
import Packages from './Packages'
import Loaders from './Loaders'

export default connect({
  showConfiguration: state`bin.showConfiguration`,
  quickstarts: state`bin.configure.quickstarts`,
  configurationClicked: signal`bin.configurationClicked`,
  quickstartClicked: signal`bin.configure.quickstartClicked`
},
  function Configure ({
    showConfiguration,
    quickstarts,
    configurationClicked,
    quickstartClicked
  }) {
    return (
      <PopoverIconButton
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
