import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

export default [
  set(state`sandbox.isLoadingSandbox`, false),
  set(state`sandbox.sandboxMessage`, null),
  set(state`app.isLoading`, false),
];
