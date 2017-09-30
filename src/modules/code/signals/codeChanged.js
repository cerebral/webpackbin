import changeCode from '../actions/changeCode';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser';
import updateFirebaseCodeChange from '../actions/updateFirebaseCodeChange';

export default [
  changeCode,
  set(
    state`app.currentBin.changedFiles.${state`app.currentBin.selectedFileIndex`}`,
    true
  ),
  set(state`code.isLinting`, true),
  whenLiveCurrentUser,
  {
    true: [
      set(props`codeChange.fileIndex`, state`app.currentBin.selectedFileIndex`),
      updateFirebaseCodeChange,
      {
        success: [],
        error: [],
      },
    ],
    false: [],
  },
];
