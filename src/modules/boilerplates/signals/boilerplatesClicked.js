import { set, when } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import showSnackbar from 'modules/app/factories/showSnackbar';
import { value } from '@cerebral/firebase/operators';
import setBoilerplates from '../actions/setBoilerplates';

export default [
  set(state`app.mainMenuPage`, 'boilerplates'),
  when(state`boilerplates.list`),
  {
    true: [],
    false: [
      set(state`boilerplates.isLoadingBoilerplates`, true),
      value('boilerplates'),
      {
        success: setBoilerplates,
        false: showSnackbar('Could not load boilerplates'),
      },
      set(state`boilerplates.isLoadingBoilerplates`, false),
    ],
  },
];
