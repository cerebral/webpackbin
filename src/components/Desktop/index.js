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
  isLive: state`app.currentBin.isLive`
},
  function Desktop ({
    clicked,
    user,
    showIsPackaging,
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
            </div>
          ) : null
        }
        {isLoading ? <Loader>Loading up the bin!</Loader> : null}
        {isLive ? <LiveParticipants /> : null}
        <Snackbar />
      </div>
    )
  }
)
