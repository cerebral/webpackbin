import lintToggled from './signals/lintToggled'
import vimModeToggled from './signals/vimModeToggled'
import settingsClicked from './signals/settingsClicked'
import regionToggled from './signals/regionToggled'

export default {
  state: {
    lint: true,
    vimMode: false,
    imageUrl: null,
    region: 'US'
  },
  signals: {
    lintToggled,
    vimModeToggled,
    settingsClicked,
    regionToggled
  }
}
