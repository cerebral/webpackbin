import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import NavigationBar from 'common/components/NavigationBar'
import FileTab from 'common/components/FileTab'
import AddFile from './AddFile'
import NavigationSeparator from 'common/components/NavigationSeparator'
import styles from './styles.css'

import filesShown from 'computed/filesShown'

export default connect({
  files: filesShown,
  changedFiles: state`app.currentBin.changedFiles`,
  selectedFileIndex: state`app.currentBin.selectedFileIndex`,
  fileClicked: signal`files.fileClicked`,
  hideFileClicked: signal`files.hideFileClicked`
},
  function FilesBar ({
    files,
    selectedFileIndex,
    fileClicked,
    hideFileClicked,
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
                key={file.name}
                onClick={() => fileClicked({index: file.index})}
                onRemoveClick={() => hideFileClicked({index: file.index})}
                active={file.index === selectedFileIndex}
                isEntry={Boolean(file.isEntry)}
                isChanged={changedFiles[file.index]}
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
