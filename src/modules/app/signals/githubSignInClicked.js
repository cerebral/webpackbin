import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import appClicked from './clicked';

export default [appClicked, set(state`app.showGithubSignIn`, true)];
