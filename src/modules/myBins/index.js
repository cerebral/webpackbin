import addMyBinsClicked from './signals/addMyBinsClicked'
import myBinsClicked from './signals/myBinsClicked'
import myBinsTitleAborted from './signals/myBinsTitleAborted'
import myBinsTitleChanged from './signals/myBinsTitleChanged'
import myBinsTitleSubmitted from './signals/myBinsTitleSubmitted'
import myBinClicked from './signals/myBinClicked'

export default {
  state: {
    list: {},
    showNewTitleInput: false,
    newMyBinTitle: ''
  },
  signals: {
    addMyBinsClicked,
    myBinsTitleAborted,
    myBinsTitleChanged,
    myBinsTitleSubmitted,
    myBinClicked,
    myBinsClicked
  }
}
