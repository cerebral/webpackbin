import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import runUndo from '../actions/runUndo';

export default [runUndo, set(state`app.undo`, null)];
