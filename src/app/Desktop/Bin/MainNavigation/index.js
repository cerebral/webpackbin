import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classNames from 'classnames'
import styles from './styles.css'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import Icon from 'components/Icon'
import SideMenu from 'components/SideMenu'
import Avatar from 'components/Avatar'
import MenuItem from 'components/MenuItem'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'

export default connect({
  isSaving: state`bin.isSaving`,
  showLog: state`bin.showLog`,
  shouldCheckLog: state`bin.shouldCheckLog`,
  leftMenuIsOpened: state`app.leftMenuIsOpened`,
  profileMenuIsOpened: state`app.profileMenuIsOpened`,
  saveClicked: signal`bin.saveClicked`,
  logToggled: signal`bin.logToggled`,
  leftMenuButtonClicked: signal`app.leftMenuButtonClicked`,
  avatarClicked: signal`app.avatarClicked`,
  createBinClicked: signal `app.createBinClicked`
},
  function MainNavigation ({
    isSaving,
    showLog,
    shouldCheckLog,
    leftMenuIsOpened,
    profileMenuIsOpened,
    saveClicked,
    logToggled,
    leftMenuButtonClicked,
    avatarClicked,
    createBinClicked
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
              disabled={isSaving}
              icon='save'
              tooltip='CTRL + s / CMD + s'
              onClick={() => saveClicked()}
            >
              Save
            </IconButton>
            <Configure />
            <IconButton
              active={showLog}
              notify={shouldCheckLog}
              icon='log'
              onClick={() => logToggled()}
            >
              Log
            </IconButton>
          </div>
          <div className={styles.flexWrapper}>
            <Avatar
              size='small'
              imageUrl='http://www.funnyjunksite.com/pictures/wp-content/uploads/2015/08/Funny-Avatar-Photo.jpg'
              onClick={(e) => {
                e.stopPropagation()
                avatarClicked()
              }}
            />
            <SideMenu
              side='right'
              show={profileMenuIsOpened}
            >
              <MenuItem>
                Profile menu content
              </MenuItem>
            </SideMenu>
          </div>
        </div>
      </NavigationBar>
    )
  }
)
