import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import classnames from 'classnames'
import CodeEditor from 'components/CodeEditor'
import Loader from 'components/Loader'
import MainNavigation from './MainNavigation'
import FilesBar from './FilesBar'
import Preview from 'components/Preview'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'

export default connect({
  isLoading: state`bin.isLoading`,
  isPackaging: state`bin.isPackaging`,
  isLoadingSandbox: state`bin.isLoadingSandbox`,
  lastSavedDatetime: state`bin.lastSavedDatetime`,
  lastForceCodeUpdate: state`bin.lastForceCodeUpdate`,
  files: state`bin.currentBin.files`,
  selectedFileIndex: state`bin.files.selectedFileIndex`,
  codeChanged: signal`bin.codeChanged`,
  codeLinted: signal`bin.codeLinted`,
  linterLoading: signal`bin.linterLoading`,
  linterLoaded: signal`bin.linterLoaded`,
  cursorChanged: signal`bin.cursorChanged`,
  sandboxLoaded: signal`bin.sandboxLoaded`,
  appClicked: signal`app.clicked`
},
  function Bin ({
    files,
    isPackaging,
    isLoadingSandbox,
    lastForceCodeUpdate,
    isLoading,
    lastSavedDatetime,
    codeChanged,
    selectedFileIndex,
    codeLinted,
    linterLoading,
    linterLoaded,
    cursorChanged,
    sandboxLoaded,
    appClicked
  }) {
    return (
      <div className={styles.wrapper}>
        <MainNavigation />
        <FilesBar />
        <div className={styles.editorWrapper}>
          <CodeEditor
            isLoading={false}
            lastForceCodeUpdate={lastForceCodeUpdate}
            file={files[selectedFileIndex]}
            onChange={codeChanged}
            onLint={codeLinted}
            onLinterLoading={linterLoading}
            onLinterLoaded={linterLoaded}
            onCursorChange={cursorChanged}
            />
          <Preview
            src={isLoading ? null : config.sandboxServiceUrl}
            lastSavedDatetime={lastSavedDatetime}
            onLoading={() => {}}
            onLoaded={sandboxLoaded}
            onLog={(log) => {}}
            onClick={appClicked}
          />
          <div className={classnames(styles.iframeLoader, {
            [styles.iframeLoaderVisible]: isLoadingSandbox
          })}>
            Loading...
          </div>
        </div>
        {isLoading ? <Loader>Loading up the bin!</Loader> : null}
        {isPackaging ? <Loader>It seems that your combination of packages is new. Please hold on until the bundle is made available on the CDN</Loader> : null}
      </div>
    )
  }
)
