import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import closeAllMenues from '../chains/closeAllMenues';

export default [closeAllMenues, set(state`app.isProfileMenuOpen`, true)];
