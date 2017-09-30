import getNpmPackage from '../actions/getNpmPackage';
import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import setPackage from '../actions/setPackage';
import showSnackbar from 'modules/app/factories/showSnackbar';
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin';
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser';

export default [
  set(state`configure.isQueryingPackage`, true),
  getNpmPackage,
  {
    success: [
      setPackage,
      set(state`configure.isQueryingPackage`, false),
      set(state`app.currentBin.packageQuery`, ''),
      whenLiveCurrentUser,
      {
        true: updateFirebaseBin(['packages', 'packageQuery']),
        false: [],
      },
    ],
    error: [
      set(state`configure.isQueryingPackage`, false),
      showSnackbar('Could not grab package, is it valid?', 5000, 'error'),
    ],
  },
];
