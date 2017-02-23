import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'common/components/IconButton'
import SideMenu from 'common/components/SideMenuMobile'
import MenuItem from 'common/components/MenuItem'
import ProfileDisplay from './ProfileDisplay'
import GithubSignIn from './GithubSignIn'
import Settings from './Settings'
import MyBins from './MyBins'

export default connect({
  isProfileMenuOpen: state`app.isProfileMenuOpen`,
  profileMenuPage: state`app.profileMenuPage`,
  user: state`app.user`,
  lint: state`settings.lint`,
  createBinClicked: signal `app.createBinClicked`,
  profileClicked: signal`app.profileClicked`,
  githubSignInClicked: signal`app.githubSignInClicked`,
  githubSignUpClicked: signal`app.githubSignUpClicked`,
  signOutClicked: signal`app.signOutClicked`,
  lintToggled: signal`settings.lintToggled`,
  settingsClicked: signal`settings.settingsClicked`,
  myBinsClicked: signal`myBins.myBinsClicked`
},
  function ProfileMenu ({
    isProfileMenuOpen,
    profileMenuPage,
    lint,
    user,
    createBinClicked,
    profileClicked,
    githubSignInClicked,
    githubSignUpClicked,
    signOutClicked,
    settingsClicked,
    myBinsClicked
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
          page={profileMenuPage}
          pages={[{
            name: 'myBins',
            content: MyBins
          }, {
            name: 'settings',
            content: Settings
          }]}
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
          <MenuItem
            active={profileMenuPage === 'myBins'}
            icon='folder'
            onClick={() => myBinsClicked()}
          >
            My bins
          </MenuItem>
          <MenuItem
            active={profileMenuPage === 'settings'}
            icon='settings'
            onClick={() => settingsClicked()}
          >
            Settings
          </MenuItem>
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
