import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import SideMenu from 'components/SideMenu'
import MenuItem from 'components/MenuItem'
import ProfileDisplay from './ProfileDisplay'

export default connect({
  isProfileMenuOpen: state`app.isProfileMenuOpen`,
  user: state`app.user`,
  createBinClicked: signal `app.createBinClicked`,
  profileClicked: signal`app.profileClicked`,
  githubSignInClicked: signal`app.githubSignInClicked`
},
  function ProfileMenu ({
    isProfileMenuOpen,
    user,
    createBinClicked,
    profileClicked,
    githubSignInClicked
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
          show={isProfileMenuOpen}
        >
          <ProfileDisplay />
          {
            user && user.isAnonymous ? (
              <MenuItem
                icon='github'
                onClick={() => githubSignInClicked()}
              >
                Sign in with Github
              </MenuItem>
            ) : null
          }
        </SideMenu>
      </div>
    )
  }
)
