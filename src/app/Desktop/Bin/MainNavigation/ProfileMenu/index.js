import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import SideMenu from 'components/SideMenu'
import MenuItem from 'components/MenuItem'
import ProfileDisplay from './ProfileDisplay'
import GithubSignIn from './GithubSignIn'

export default connect({
  isProfileMenuOpen: state`app.isProfileMenuOpen`,
  user: state`app.user`,
  createBinClicked: signal `app.createBinClicked`,
  profileClicked: signal`app.profileClicked`,
  githubSignInClicked: signal`app.githubSignInClicked`,
  githubSignUpClicked: signal`app.githubSignUpClicked`,
  signOutClicked: signal`app.signOutClicked`
},
  function ProfileMenu ({
    isProfileMenuOpen,
    user,
    createBinClicked,
    profileClicked,
    githubSignInClicked,
    githubSignUpClicked,
    signOutClicked
  }) {
    return (
      <div>
        <IconButton
          icon='user'
          imageUrl={!user || user.isAnonymous ? null : user.providerData[0].photoURL}
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
          {
            user && !user.isAnonymous ? (
              <MenuItem
                icon='signOut'
                onClick={() => signOutClicked()}
              >
                Sign out
              </MenuItem>
            ) : null
          }
        </SideMenu>
        <GithubSignIn />
      </div>
    )
  }
)
