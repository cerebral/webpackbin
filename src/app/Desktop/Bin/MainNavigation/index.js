import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import SideMenu from 'components/SideMenu'
import MenuItem from 'components/MenuItem'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  isSaving: state`bin.isSaving`,
  showLog: state`bin.currentBin.showLog`,
  shouldCheckLog: state`bin.shouldCheckLog`,
  leftMenuIsOpened: state`app.leftMenuIsOpened`,
  profileMenuIsOpened: state`app.profileMenuIsOpened`,
  saveClicked: signal`bin.saveClicked`,
  logToggled: signal`bin.logToggled`,
  leftMenuButtonClicked: signal`app.leftMenuButtonClicked`,
  avatarClicked: signal`app.avatarClicked`,
  createBinClicked: signal`app.createBinClicked`,
  githubSignInClicked: signal`app.githubSignInClicked`,
  liveToggled: signal`bin.liveToggled`
},
  function MainNavigation ({
    liveStatus,
    isSaving,
    showLog,
    shouldCheckLog,
    leftMenuIsOpened,
    profileMenuIsOpened,
    saveClicked,
    logToggled,
    leftMenuButtonClicked,
    avatarClicked,
    createBinClicked,
    githubSignInClicked,
    liveToggled
  }) {
    return (
      <NavigationBar>
        <div className={styles.wrapper}>
          <div className={classNames(styles.flexWrapper, styles.flex)}>
            <Icon
              icon='menu'
              onClick={(e) => {
                e.stopPropagation()
                leftMenuButtonClicked()
              }}
            >
              Menu
            </Icon>
            <SideMenu
              side='left'
              show={leftMenuIsOpened}
            >
              <MenuItem onClick={() => createBinClicked()}>
                Create bin
              </MenuItem>
            </SideMenu>
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
              disabled={liveStatus.isParticipant}
              active={liveStatus.isConnected}
              icon='live'
              onClick={() => liveToggled()}
            >
              Live
            </IconButton>
          </div>
          <div className={styles.flexWrapper}>
            <IconButton
              icon='user'
              onClick={(e) => {
                e.stopPropagation()
                avatarClicked()
              }}
            >
              Profile
            </IconButton>
            <SideMenu
              side='right'
              show={profileMenuIsOpened}
            >
              <MenuItem onClick={() => githubSignInClicked()}>
                Profile menu content
              </MenuItem>
            </SideMenu>
          </div>
        </div>
      </NavigationBar>
    )
  }
)
