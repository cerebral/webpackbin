import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'common/components/NavigationBar'
import IconButton from 'common/components/IconButton'
import Separator from 'common/components/Separator'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'
import liveStatus from 'computed/liveStatus'
import binHasEntry from 'computed/binHasEntry'
import ProfileMenu from '../ProfileMenu'
import MainMenu from '../MainMenu'
import Favorite from './Favorite'
import Stats from './Stats'

export default connect({
  liveStatus,
  binHasEntry,
  region: state`settings.region`,
  changedFiles: state`app.currentBin.changedFiles`,
  isSaving: state`app.isSaving`,
  showLog: state`app.currentBin.showLog`,
  showFolder: state`app.currentBin.showFolder`,
  shouldCheckLog: state`log.shouldCheckLog`,
  saveClicked: signal`app.saveClicked`,
  logToggled: signal`log.logToggled`,
  folderToggled: signal`files.folderToggled`,
  createBinClicked: signal`app.createBinClicked`,
  liveToggled: signal`live.liveToggled`
},
  function MainNavigation ({
    liveStatus,
    binHasEntry,
    region,
    changedFiles,
    isSaving,
    showLog,
    showFolder,
    shouldCheckLog,
    saveClicked,
    logToggled,
    folderToggled,
    leftMenuButtonClicked,
    createBinClicked,
    liveToggled
  }) {
    return (
      <NavigationBar>
        <div className={styles.wrapper}>
          <div className={classNames(styles.flexWrapper, styles.flex)}>
            <MainMenu />
            <Separator />
            <IconButton
              disabled={isSaving || liveStatus.isParticipant}
              icon='save'
              tooltip='Save'
              onClick={() => saveClicked()}
            />
            <IconButton
              active={showFolder}
              disabled={liveStatus.isParticipant}
              icon='folder'
              tooltip={showFolder ? 'Hide folder' : 'Show folder'}
              onClick={(event) => {
                event.stopPropagation()
                folderToggled()
              }}
            />
            <IconButton
              active={showLog}
              disabled={liveStatus.isParticipant}
              notify={shouldCheckLog}
              icon='log'
              tooltip={showLog ? 'Hide log' : 'Show log'}
              onClick={() => logToggled()}
            />
            <Separator />
            <Favorite />
            <Stats />
          </div>
          <div className={styles.flexWrapper}>
            <IconButton
              disabled={!binHasEntry || Object.keys(changedFiles).length || isSaving}
              icon='zip'
              tooltip='Download'
              href={`${config.sandboxServiceUrl[region]}/project.zip`}
            />
            <IconButton
              disabled={!liveStatus.isAdmin}
              active={liveStatus.isConnected}
              icon='live'
              tooltip={liveStatus.isConnected ? 'Turn off LIVE' : 'Turn on LIVE'}
              onClick={() => liveToggled()}
            />
            <Configure />
            <Separator />
            <ProfileMenu />
          </div>
        </div>
      </NavigationBar>
    )
  }
)
