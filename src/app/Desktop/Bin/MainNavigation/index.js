import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'
import liveStatus from 'computed/liveStatus'
import ProfileMenu from './ProfileMenu'
import MainMenu from './MainMenu'

export default connect({
  liveStatus,
  isSaving: state`bin.isSaving`,
  showLog: state`bin.currentBin.showLog`,
  shouldCheckLog: state`bin.shouldCheckLog`,
  saveClicked: signal`bin.saveClicked`,
  logToggled: signal`bin.logToggled`,
  createBinClicked: signal`app.createBinClicked`,
  liveToggled: signal`bin.liveToggled`
},
  function MainNavigation ({
    liveStatus,
    isSaving,
    showLog,
    shouldCheckLog,
    saveClicked,
    logToggled,
    leftMenuButtonClicked,
    createBinClicked,
    liveToggled
  }) {
    return (
      <NavigationBar>
        <div className={styles.wrapper}>
          <div className={classNames(styles.flexWrapper, styles.flex)}>
            <MainMenu />
            <div style={{width: '30px'}} />
            <IconButton
              disabled={isSaving || liveStatus.isParticipant}
              icon='save'
              tooltip='CTRL + s / CMD + s'
              onClick={() => saveClicked()}
            >
              Save
            </IconButton>
            <Configure />
            <IconButton
              active={showLog}
              disabled={liveStatus.isParticipant}
              notify={shouldCheckLog}
              icon='log'
              onClick={() => logToggled()}
            >
              Log
            </IconButton>
            <IconButton
              disabled={!liveStatus.isAdmin}
              active={liveStatus.isConnected}
              icon='live'
              onClick={() => liveToggled()}
            >
              Live
            </IconButton>
          </div>
          <div className={styles.flexWrapper}>
            <ProfileMenu />
          </div>
        </div>
      </NavigationBar>
    )
  }
)
