import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import SideMenu from 'components/SideMenu'
import MenuItem from 'components/MenuItem'
import Checkbox from 'components/Checkbox'
import Description from 'components/Description'
import ProfileDisplay from './ProfileDisplay'
import GithubSignIn from './GithubSignIn'

export default connect({
  isProfileMenuOpen: state`app.isProfileMenuOpen`,
  user: state`app.user`,
  lint: state`settings.lint`,
  createBinClicked: signal `app.createBinClicked`,
  profileClicked: signal`app.profileClicked`,
  githubSignInClicked: signal`app.githubSignInClicked`,
  githubSignUpClicked: signal`app.githubSignUpClicked`,
  signOutClicked: signal`app.signOutClicked`,
  lintToggled: signal`settings.lintToggled`
},
  function ProfileMenu ({
    isProfileMenuOpen,
    lint,
    user,
    createBinClicked,
    profileClicked,
    githubSignInClicked,
    githubSignUpClicked,
    signOutClicked,
    lintToggled
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
          <MenuItem onClick={() => lintToggled()}>
            <div>
              <Checkbox
                onChange={() => lintToggled()}
                checked={lint}
              >
                Linter
              </Checkbox>
              <Description light>
                Load and run supported linters
              </Description>
            </div>
          </MenuItem>
        </SideMenu>
        <GithubSignIn />
      </div>
    )
  }
)
