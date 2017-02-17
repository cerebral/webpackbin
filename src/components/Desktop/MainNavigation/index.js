import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'common/components/NavigationBar'
import IconButton from 'common/components/IconButton'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'
import liveStatus from 'computed/liveStatus'
import binHasEntry from 'computed/binHasEntry'
import ProfileMenu from '../ProfileMenu'
import MainMenu from '../MainMenu'
import MyBins from './MyBins'

export default connect({
  liveStatus,
  binHasEntry,
  changedFiles: state`app.currentBin.changedFiles`,
  isSaving: state`app.isSaving`,
  showLog: state`app.currentBin.showLog`,
  shouldCheckLog: state`log.shouldCheckLog`,
  saveClicked: signal`app.saveClicked`,
  logToggled: signal`log.logToggled`,
  createBinClicked: signal`app.createBinClicked`,
  liveToggled: signal`live.liveToggled`
},
  function MainNavigation ({
    liveStatus,
    binHasEntry,
    changedFiles,
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
            <IconButton
              active={showLog}
              disabled={liveStatus.isParticipant}
              notify={shouldCheckLog}
              icon='log'
              onClick={() => logToggled()}
            >
              Log
            </IconButton>
            <MyBins />
          </div>
          <div className={styles.flexWrapper}>
            <IconButton
              disabled={!binHasEntry || Object.keys(changedFiles).length || isSaving}
              active={liveStatus.isConnected}
              icon='zip'
              href={`${config.sandboxServiceUrl}/project.zip`}
            >
              Download
            </IconButton>
            <IconButton
              disabled={!liveStatus.isAdmin}
              active={liveStatus.isConnected}
              icon='live'
              onClick={() => liveToggled()}
            >
              Live
            </IconButton>
            <Configure />
            <ProfileMenu />
          </div>
        </div>
      </NavigationBar>
    )
  }
)
