import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin';
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser';
import closeAllMenues from 'modules/app/chains/closeAllMenues';

export default [
  closeAllMenues,
  set(state`app.currentBin.showConfiguration`, true),
  whenLiveCurrentUser,
  {
    true: updateFirebaseBin('showConfiguration'),
    false: [],
  },
];
