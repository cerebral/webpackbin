import {parallel} from 'cerebral'
import {value} from 'cerebral-provider-firebase/operators'
import {props, string} from 'cerebral/tags'
import setSettings from 'modules/settings/actions/setSettings'
import setMyBins from 'modules/myBins/actions/setMyBins'
import showSnackbar from '../factories/showSnackbar'

export default parallel('setUserRelatedDate', [
  value(string`settings.${props`user.uid`}`), {
    success: setSettings,
    error: showSnackbar('Unable to load your settings', 5000, 'error')
  },
  value(string`myBins.${props`user.uid`}`), {
    success: setMyBins,
    error: showSnackbar('Unable to load your bins', 5000, 'error')
  }
])
