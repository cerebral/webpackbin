import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import SideMenu from 'components/SideMenu'
import MenuItem from 'components/MenuItem'
import ProfileDisplay from './ProfileDisplay'

export default connect({
  profileMenuIsOpened: state`app.profileMenuIsOpened`,
  createBinClicked: signal `app.createBinClicked`,
  profileClicked: signal`app.profileClicked`
},
  function ProfileMenu ({
    profileMenuIsOpened,
    createBinClicked,
    profileClicked
  }) {
    return (
      <div>
        <IconButton
          icon='user'
          onClick={(e) => {
            e.stopPropagation()
            profileClicked()
          }}
        >
          Profile
        </IconButton>
        <SideMenu
          side='right'
          show={profileMenuIsOpened}
        >
          <ProfileDisplay />
          <MenuItem icon='github'>
            Sign in with Github
          </MenuItem>
        </SideMenu>
      </div>
    )
  }
)
