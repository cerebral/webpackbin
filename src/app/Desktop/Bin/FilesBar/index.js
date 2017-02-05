import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import NavigationBar from 'components/NavigationBar'
import FileTab from 'components/FileTab'

export default connect({
  files: state`bin.files`,
  selectedFileIndex: state`bin.selectedFileIndex`,
  fileClicked: signal`bin.fileClicked`,
  removeFileClicked: signal`bin.removeFileClicked`
},
  function FilesBar ({files, selectedFileIndex, fileClicked, removeFileClicked}) {
    return (
      <NavigationBar>
        {files.map(function (file, index) {
          return (
            <FileTab
              onClick={() => fileClicked({index})}
              onRemoveClick={index === 0 ? null : () => removeFileClicked({index})}
              active={index === selectedFileIndex}
              isEntry={Boolean(file.isEntry)}
            >
              {file.name}
            </FileTab>
          )
        })}
      </NavigationBar>
    )
  }
)
