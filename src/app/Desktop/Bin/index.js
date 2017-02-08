import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import CodeEditor from 'components/CodeEditor'
import MainNavigation from './MainNavigation'
import FilesBar from './FilesBar'
import Preview from 'components/Preview'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'

export default connect({
  isLoading: state`bin.isLoading`,
  lastSavedDatetime: state`bin.lastSavedDatetime`,
  lastForceCodeUpdate: state`bin.lastForceCodeUpdate`,
  files: state`bin.currentBin.files`,
  selectedFileIndex: state`bin.files.selectedFileIndex`,
  codeChanged: signal`bin.codeChanged`,
  codeLinted: signal`bin.codeLinted`,
  linterLoading: signal`bin.linterLoading`,
  linterLoaded: signal`bin.linterLoaded`,
  cursorChanged: signal`bin.cursorChanged`
},
  function Desktop ({
    files,
    lastForceCodeUpdate,
    isLoading,
    lastSavedDatetime,
    codeChanged,
    selectedFileIndex,
    codeLinted,
    linterLoading,
    linterLoaded,
    cursorChanged
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
          {
            isLoading
            ? null
            : (
              <Preview
                src={config.sandboxServiceUrl}
                lastSavedDatetime={lastSavedDatetime}
              />
            )
          }
        </div>
      </div>
    )
  }
)
