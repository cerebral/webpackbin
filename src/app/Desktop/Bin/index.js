import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import CodeEditor from 'components/CodeEditor'
import FilesBar from './FilesBar'
import Preview from 'components/Preview'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'

export default connect({
  isLoading: state`bin.isLoading`,
  lastSavedDatetime: state`bin.lastSavedDatetime`,
  files: state`bin.files`,
  selectedFileIndex: state`bin.selectedFileIndex`,
  codeChanged: signal`bin.codeChanged`,
  codeLinted: signal`bin.codeLinted`,
  linterLoading: signal`bin.linterLoading`,
  linterLoaded: signal`bin.linterLoaded`
},
  function Desktop ({
    files,
    isLoading,
    lastSavedDatetime,
    codeChanged,
    selectedFileIndex,
    codeLinted,
    linterLoading,
    linterLoaded
  }) {
    return (
      <div className={styles.wrapper}>
        <FilesBar />
        <div className={styles.editorWrapper}>
          <CodeEditor
            isLoading={false}
            file={files[selectedFileIndex]}
            onChange={codeChanged}
            onLint={codeLinted}
            onLinterLoading={linterLoading}
            onLinterLoaded={linterLoaded}
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
