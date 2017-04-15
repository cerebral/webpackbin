import fileClicked from './signals/fileClicked'
import removeFileClicked from './signals/removeFileClicked'
import isEntryToggled from './signals/isEntryToggled'
import newFileAborted from './signals/newFileAborted'
import newFileClicked from './signals/newFileClicked'
import newFileNameChanged from './signals/newFileNameChanged'
import newFileNameSubmitted from './signals/newFileNameSubmitted'
import folderToggled from './signals/folderToggled'
import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'
import showFileClicked from './signals/showFileClicked'
import hideFileClicked from './signals/hideFileClicked'

export default {
  state: {
    removedFile: null,
    removedFileIndex: null
  },
  signals: {
    fileClicked: preventWhenLiveParticipant(fileClicked),
    removeFileClicked: preventWhenLiveParticipant(removeFileClicked),
    isEntryToggled: preventWhenLiveParticipant(isEntryToggled),
    newFileAborted: preventWhenLiveParticipant(newFileAborted),
    newFileClicked: preventWhenLiveParticipant(newFileClicked),
    newFileNameChanged: preventWhenLiveParticipant(newFileNameChanged),
    newFileNameSubmitted: preventWhenLiveParticipant(newFileNameSubmitted),
    folderToggled: preventWhenLiveParticipant(folderToggled),
    showFileClicked: preventWhenLiveParticipant(showFileClicked),
    hideFileClicked: preventWhenLiveParticipant(hideFileClicked)
  }
}
