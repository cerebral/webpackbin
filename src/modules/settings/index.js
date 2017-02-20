import lintToggled from './signals/lintToggled'
import settingsClicked from './signals/settingsClicked'
import regionToggled from './signals/regionToggled'

export default {
  state: {
    lint: true,
    imageUrl: null,
    region: 'US'
  },
  signals: {
    lintToggled,
    settingsClicked,
    regionToggled
  }
}
