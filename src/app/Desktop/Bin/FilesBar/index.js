import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import NavigationBar from 'components/NavigationBar'
import FileTab from 'components/FileTab'
import AddFile from './AddFile'
import NavigationSeparator from 'components/NavigationSeparator'

export default connect({
  files: state`bin.currentBin.files`,
  changedFiles: state`bin.currentBin.changedFiles`,
  selectedFileIndex: state`bin.currentBin.selectedFileIndex`,
  fileClicked: signal`bin.files.fileClicked`,
  removeFileClicked: signal`bin.files.removeFileClicked`
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
      </NavigationBar>
    )
  }
)
