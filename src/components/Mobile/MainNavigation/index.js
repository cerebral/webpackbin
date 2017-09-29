import config from 'config'
import React from 'react'
import {connect} from '@cerebral/react'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'common/components/NavigationBar'
import IconButton from 'common/components/IconButton'
import {state, signal} from 'cerebral/tags'
import liveStatus from 'computed/liveStatus'
import binHasEntry from 'computed/binHasEntry'
import ProfileMenu from '../ProfileMenu'
import FilesMenu from '../FilesMenu'

export default connect({
  liveStatus,
  binHasEntry,
  region: state`settings.region`,
  changedFiles: state`app.currentBin.changedFiles`,
  isSaving: state`app.isSaving`,
  showLog: state`app.currentBin.showLog`,
  showSandbox: state`app.showSandbox`,
  shouldCheckLog: state`log.shouldCheckLog`,
  logToggled: signal`log.logToggled`,
  showSandboxClicked: signal`sandbox.showSandboxClicked`
},
  function MainNavigation ({
    liveStatus,
    binHasEntry,
    region,
    changedFiles,
    showSandbox,
    isSaving,
    showLog,
    shouldCheckLog,
    logToggled,
    leftMenuButtonClicked,
    showSandboxClicked
  }) {
    return (
      <NavigationBar>
        <div className={styles.wrapper}>
          <div className={classNames(styles.flexWrapper, styles.flex)}>
            <FilesMenu />
            <IconButton
              active={showSandbox}
              disabled={liveStatus.isParticipant}
              icon='eye'
              onClick={() => showSandboxClicked()}
            >
              Preview
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
          </div>
          <div className={styles.flexWrapper}>
            <IconButton
              disabled
              active={liveStatus.isConnected}
              icon='live'
              onClick={() => liveToggled()}
            >
              Live
            </IconButton>
            <ProfileMenu />
          </div>
        </div>
      </NavigationBar>
    )
  }
)
