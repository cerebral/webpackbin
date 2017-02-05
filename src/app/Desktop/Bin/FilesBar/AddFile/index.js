import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import Checkbox from 'components/Checkbox'
import Input from 'components/Input'
import styles from './styles.css'

import binHasEntry from 'computed/binHasEntry'

export default connect({
  showNewFileInput: state`bin.files.showNewFileInput`,
  newFileName: state`bin.files.newFileName`,
  newFileIsEntry: state`bin.files.newFileIsEntry`,
  hasEntry: binHasEntry,
  newFileClicked: signal`bin.files.newFileClicked`,
  newFileNameChanged: signal`bin.files.newFileNameChanged`,
  newFileNameSubmitted: signal`bin.files.newFileNameSubmitted`,
  isEntryToggled: signal`bin.files.isEntryToggled`,
  newFileAborted: signal`bin.files.newFileAborted`
},
  class AddFile extends Component {
    constructor (props) {
      super(props)
      this.onEntryToggle = this.onEntryToggle.bind(this)
    }
    componentDidUpdate (prevProps) {
      if (!prevProps.showNewFileInput && this.props.showNewFileInput) {
        this.focusInput()
      }
    }
    focusInput () {
      document.querySelector('#newFileName').focus()
    }
    onEntryToggle () {
      this.focusInput()
      this.props.isEntryToggled()
    }
    render () {
      const {
        showNewFileInput,
        newFileName,
        newFileIsEntry,
        hasEntry,
        newFileClicked,
        newFileNameChanged,
        newFileNameSubmitted,
        newFileAborted
      } = this.props

      if (showNewFileInput) {
        return (
          <div className={styles.wrapper}>
            <Input
              id='newFileName'
              autoFocus
              value={newFileName}
              onInput={(event) => newFileNameChanged({value: event.target.value})}
              onSubmit={newFileNameSubmitted}
              onCancel={newFileAborted}
              placeholder='Filename...'
            />
            <Checkbox
              checked={newFileIsEntry}
              disabled={hasEntry}
              onChange={this.onEntryToggle}
            >
              Is entry
            </Checkbox>
          </div>
        )
      }

      return (
        <div className={styles.wrapper}>
          <IconButton
            onClick={() => newFileClicked()}
            icon='addFile'
          >
            New file
          </IconButton>
        </div>
      )
    }
  }
)
