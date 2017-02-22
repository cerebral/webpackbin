import fileClicked from './signals/fileClicked'
import removeFileClicked from './signals/removeFileClicked'
import isEntryToggled from './signals/isEntryToggled'
import newFileAborted from './signals/newFileAborted'
import newFileClicked from './signals/newFileClicked'
import newFileNameChanged from './signals/newFileNameChanged'
import newFileNameSubmitted from './signals/newFileNameSubmitted'
import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'
import activateTab from 'modules/files/factories/activateTab'

export default {
  signals: {
    fileClicked: preventWhenLiveParticipant(fileClicked),
    nextFileTabActivated: preventWhenLiveParticipant(activateTab('+')),
    previousFileTabActivated: preventWhenLiveParticipant(activateTab('-')),
    removeFileClicked: preventWhenLiveParticipant(removeFileClicked),
    isEntryToggled: preventWhenLiveParticipant(isEntryToggled),
    newFileAborted: preventWhenLiveParticipant(newFileAborted),
    newFileClicked: preventWhenLiveParticipant(newFileClicked),
    newFileNameChanged: preventWhenLiveParticipant(newFileNameChanged),
    newFileNameSubmitted: preventWhenLiveParticipant(newFileNameSubmitted)
  }
}
