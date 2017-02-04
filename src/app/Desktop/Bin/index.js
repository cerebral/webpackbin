import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import CodeEditor from 'components/CodeEditor'
import Preview from 'components/Preview'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'

export default connect({
  isLoading: state`bin.isLoading`,
  lastSavedDatetime: state`bin.lastSavedDatetime`,
  files: state`bin.files`,
  codeChanged: signal`bin.codeChanged`
},
  function Desktop ({files, isLoading, lastSavedDatetime, codeChanged}) {
    return (
      <div className={styles.editorWrapper}>
        <CodeEditor
          isLoading={false}
          file={files[0]}
          onChange={codeChanged}
          onLint={() => { console.log('linted') }}
          onLinterLoad={() => { console.log('loading linter') }}
          onLinterLoaded={() => { console.log('linter loaded') }}
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
    )
  }
)
