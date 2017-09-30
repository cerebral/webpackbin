import updateBinWithTemplate from '../actions/updateBinWithTemplate';
import saveClicked from 'modules/app/signals/saveClicked';
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate';
import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

export default [
  updateBinWithTemplate,
  set(state`app.currentBin.showConfiguration`, false),
  set(state`configure.showQuickstart`, false),
  forceCodeUpdate,
  set(state`app.isLoading`, true),
  saveClicked,
];
