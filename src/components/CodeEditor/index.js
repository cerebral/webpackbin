import '!style-loader!css-loader!./lint.css'
import '!style-loader!css-loader!./../../../node_modules/codemirror/lib/codemirror.css'
import '!style-loader!css-loader!./codeEditor.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/keymap/vim.js'
import Inferno from 'inferno'
import Component from 'inferno-component'
import CodeMirror from 'codemirror'
import styles from './styles.css'
import modes from './modes'

/*
@Cerebral({
  selectedFileIndex: 'bin.selectedFileIndex',
  files: 'bin.currentBin.files',
  isLoadingBin: 'bin.isLoadingBin',
  isRunning: 'bin.isRunning',
  forceUpdateCode: 'bin.forceUpdateCode',
  vimMode: 'bin.vimMode',
  hasJoinedLive: 'live.hasJoined',
  canControl: canControl
})
*/
class CodeEditor extends Component {
  constructor (props) {
    super(props)
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onUpdateLinting = this.onUpdateLinting.bind(this)
  }
  componentDidMount () {
    this.codemirror = CodeMirror(this.codeElement, {
      value: this.props.file.content,
      mode: modes.get(),
      theme: 'webpackbin',
      matchTags: {bothTags: true},
      autoCloseTags: true,
      gutters: ['CodeMirror-lint-markers'],
      lint: false,
      lineNumbers: true,
      readOnly: this.props.readOnly ? 'nocursor' : false,
      indentUnit: 2,
      extraKeys: {
        Tab (cm) {
          const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')

          cm.replaceSelection(spaces)
        }
      }
    })
    this.codemirror.on('change', this.onCodeChange)
    this.setModeAndLinter()
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.isLoading && this.props.isLoading) {
      this.codemirror.setOption('readOnly', true)
    } else if (prevProps.isLoading && !this.props.isLoading) {
      this.codemirror.setOption('readOnly', false)
    }

    if (
      prevProps.file.name !== this.props.file.name ||
      this.props.readOnly && prevProps.file.content !== this.props.file.content
    ) {
      this.setModeAndLinter()
      this.setEditorValue(this.props.file.content)
      this.codemirror.getDoc().clearHistory()
    }

    if (prevProps.vimMode !== this.props.vimMode) {
      this.codemirror.setOption('keyMap', this.props.vimMode ? 'vim' : 'default')
    }
  }
  setEditorValue (value) {
    this.isUpdatingCode = true
    this.codemirror.setValue(value)
    this.isUpdatingCode = false
  }
  setModeAndLinter () {
    const modeAlreadyLoaded = modes.isLoaded(this.props.file)

    if (!modeAlreadyLoaded) {
      this.props.onLinterLoaded()
    }

    modes.set(this.props.file)
      .then((linter) => {
        this.codemirror.setOption('lint', linter === false ? false : {
          getAnnotations: linter,
          onUpdateLinting: this.onUpdateLinting
        })
        this.codemirror.setOption('mode', modes.get(this.props.file))
        this.setEditorValue(this.codemirror.getValue())

        if (!modeAlreadyLoaded) {
          this.props.onLinterLoaded()
        }
      })
  }
  onUpdateLinting (errors) {
    this.props.onLint({
      isValid: !Boolean(errors.length)
    })
  }
  onCodeChange (instance, event) {
    if (!this.isUpdatingCode) {
      if (event.text.length === 2 && !event.text[0] && !event.text[1]) {
        event.text = ['\n']
      }

      this.props.onChange({
        from: event.from,
        to: event.to,
        text: event.text
      })
    }
  }
  render () {
    return (
      <div className={styles.wrapper}>
        <div
          ref={(node) => {
            this.codeElement = node
          }}
          className={styles.codeWrapper} />
      </div>
    )
  }
}

export default CodeEditor
