import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import MenuItem from 'common/components/MenuItem'
import SideMenu from 'common/components/SideMenuMobile'
import IconButton from 'common/components/IconButton'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  files: state`app.currentBin.files`,
  currentBinKey: state`app.currentBinKey`,
  isFilesMenuOpen: state`app.isFilesMenuOpen`,
  selectedFileIndex: state`app.currentBin.selectedFileIndex`,
  fileClicked: signal`files.fileClicked`,
  filesMenuButtonClicked: signal`app.filesMenuButtonClicked`
},
  function FilesMenu ({
    liveStatus,
    isFilesMenuOpen,
    files,
    currentBinKey,
    selectedFileIndex,
    fileClicked,
    filesMenuButtonClicked
  }) {
    return (
      <div>
        <IconButton
          disabled={liveStatus.isParticipant}
          icon='folder'
          onClick={(e) => {
            e.stopPropagation()
            filesMenuButtonClicked()
          }}
        >
          Files
        </IconButton>
        <SideMenu
          side='left'
          show={isFilesMenuOpen}
        >
          {files.map((file, index) => {
            return (
              <MenuItem
                active={index === selectedFileIndex}
                key={index}
                icon='newBin'
                onClick={() => fileClicked({index: index})}
                >
                {file.name}
              </MenuItem>
            )
          })}
        </SideMenu>
      </div>
    )
  }
)
