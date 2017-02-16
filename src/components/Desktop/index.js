import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import classnames from 'classnames'
import CodeEditor from './CodeEditor'
import Loader from 'common/components/Loader'
import MainNavigation from './MainNavigation'
import FilesBar from './FilesBar'
import Sandbox from './Sandbox'
import LiveParticipants from './LiveParticipants'
import Snackbar from './Snackbar'
import styles from './styles.css'

export default connect({
  clicked: signal`app.clicked`,
  user: state`app.user`,
  isLoading: state`app.isLoading`,
  showIsPackaging: state`sandbox.showIsPackaging`,
  showIsLoadingSandbox: state`sandbox.showIsLoadingSandbox`,
  isLive: state`app.currentBin.isLive`
},
  function Desktop ({
    clicked,
    user,
    showIsPackaging,
    showIsLoadingSandbox,
    isLoading,
    isLive
  }) {
    return (
      <div
        className={styles.wrapper}
        onClick={() => clicked()}
      >
        <MainNavigation />
        <FilesBar />
        {
          user ? (
            <div className={styles.editorWrapper}>
              <CodeEditor />
              <Sandbox />
              <div className={classnames(styles.iframeLoader, {
                [styles.iframeLoaderVisible]: showIsLoadingSandbox
              })}>
                Loading...
              </div>
            </div>
          ) : null
        }
        {!showIsPackaging && isLoading ? <Loader>Loading up the bin!</Loader> : null}
        {showIsPackaging ? (
          <Loader>
            It seems that your combination of packages is new. Please hold on until the bundle is made available on the CDN.
            {process.env.WEBPACKBIN_ENV !== 'webpackbin-prod' ? 'You are also located on test server, meaning that the services might be sleeping. It takes a few seconds to boot up!' : null}
          </Loader>
        ) : null}
        {isLive ? <LiveParticipants /> : null}
        <Snackbar />
      </div>
    )
  }
)
