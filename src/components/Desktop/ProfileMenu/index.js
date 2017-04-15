import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'common/components/IconButton'
import SideMenu from 'common/components/SideMenu'
import MenuItem from 'common/components/MenuItem'
import ProfileDisplay from './ProfileDisplay'
import GithubSignIn from './GithubSignIn'
import Settings from './Settings'
import Favorites from './Favorites'

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
  favoritesClicked: signal`favorites.favoritesClicked`
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
    favoritesClicked
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
        />
        <SideMenu
          side='right'
          show={isProfileMenuOpen}
          page={profileMenuPage}
          pages={[{
            name: 'favorites',
            content: Favorites
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
            active={profileMenuPage === 'favorites'}
            icon='favorite'
            onClick={() => favoritesClicked()}
          >
            Favorites
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
