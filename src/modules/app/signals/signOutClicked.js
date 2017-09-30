import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import { signOut } from '@cerebral/firebase/operators';
import { redirect } from '@cerebral/router/operators';
import authenticate from '../factories/authenticate';
import showSnackbar from '../factories/showSnackbar';

export default [
  set(state`app.isAuthenticating`, true),
  set(state`app.isProfileMenuOpen`, false),
  signOut(),
  {
    success: [set(state`app.user`, null), authenticate([redirect('/')])],
    error: showSnackbar(
      'Unable to sign you out, try to refresh',
      null,
      'error'
    ),
  },
];
