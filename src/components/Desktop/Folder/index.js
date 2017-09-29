import React from 'react'
import {connect} from '@cerebral/react'
import path from 'path'
import classnames from 'classnames'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'
import icons from 'common/icons.css'

import filesByFolder from 'computed/filesByFolder'

export default connect({
  folders: filesByFolder,
  showFolder: state`app.currentBin.showFolder`,
  showFileClicked: signal`files.showFileClicked`,
  removeFileClicked: signal`files.removeFileClicked`
},
  function Folder ({folders, showFolder, showFileClicked, removeFileClicked}) {
    if (!showFolder) {
      return null
    }

    return (
      <div className={styles.wrapper} onClick={(event) => event.stopPropagation()}>
        {folders.map(function (folder) {
          return (
            <div className={styles.column}>
              <div className={styles.header}>
                {folder.name}
              </div>
              {folder.files.map(function (file) {
                return (
                  <div className={classnames(styles.file, {
                    [styles.notShown]: file.show === false
                  })} onClick={() => showFileClicked({index: file.index})}>
                    <div className={classnames(
                      icons.newBin,
                      styles.icon
                    )} /> {path.basename(file.name)} <div className={classnames(
                      icons.delete,
                      styles.deleteIcon
                    )} onClick={(event) => {
                      event.stopPropagation()
                      removeFileClicked({index: file.index})
                    }} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
)
