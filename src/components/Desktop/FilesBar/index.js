import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import NavigationBar from 'common/components/NavigationBar'
import FileTab from 'common/components/FileTab'
import AddFile from './AddFile'
import NavigationSeparator from 'common/components/NavigationSeparator'
import styles from './styles.css'

export default connect({
  files: state`app.currentBin.files`,
  changedFiles: state`app.currentBin.changedFiles`,
  selectedFileIndex: state`app.currentBin.selectedFileIndex`,
  fileClicked: signal`files.fileClicked`,
  removeFileClicked: signal`files.removeFileClicked`
},
  function FilesBar ({
    files,
    selectedFileIndex,
    fileClicked,
    removeFileClicked,
    changedFiles
  }) {
    return (
      <NavigationBar>
        <AddFile />
        <NavigationSeparator />
        <div className={styles.wrapper}>
          {files.map(function (file, index) {
            return (
              <FileTab
                onClick={() => fileClicked({index})}
                onRemoveClick={index === 0 ? null : () => removeFileClicked({index})}
                active={index === selectedFileIndex}
                isEntry={Boolean(file.isEntry)}
                isChanged={changedFiles[index]}
              >
                {file.name}
              </FileTab>
            )
          })}
        </div>
      </NavigationBar>
    )
  }
)
