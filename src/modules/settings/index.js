import lintToggled from './signals/lintToggled'
import settingsClicked from './signals/settingsClicked'
import myBinsClicked from './signals/myBinsClicked'

export default {
  state: {
    lint: true,
    imageUrl: null
  },
  signals: {
    lintToggled,
    settingsClicked,
    myBinsClicked
  }
}
