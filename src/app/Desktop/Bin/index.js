import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classnames from 'classnames'
import CodeEditor from './CodeEditor'
import Loader from 'components/Loader'
import MainNavigation from './MainNavigation'
import FilesBar from './FilesBar'
import Preview from './Preview'
import LiveParticipants from './LiveParticipants'
import styles from './styles.css'
import {state} from 'cerebral/tags'

export default connect({
  user: state`app.user`,
  isLoading: state`bin.isLoading`,
  showIsPackaging: state`bin.showIsPackaging`,
  showIsLoadingSandbox: state`bin.showIsLoadingSandbox`,
  isLive: state`bin.currentBin.isLive`
},
  function Bin ({
    user,
    showIsPackaging,
    showIsLoadingSandbox,
    isLoading,
    isLive
  }) {
    return (
      <div className={styles.wrapper}>
        <MainNavigation />
        <FilesBar />
        {
          user ? (
            <div className={styles.editorWrapper}>
              <CodeEditor />
              <Preview />
              <div className={classnames(styles.iframeLoader, {
                [styles.iframeLoaderVisible]: showIsLoadingSandbox
              })}>
                Loading...
              </div>
            </div>
          ) : null
        }
        {!showIsPackaging && isLoading ? <Loader>Loading up the bin!</Loader> : null}
        {showIsPackaging ? <Loader>It seems that your combination of packages is new. Please hold on until the bundle is made available on the CDN</Loader> : null}
        {isLive ? <LiveParticipants /> : null}

      </div>
    )
  }
)
