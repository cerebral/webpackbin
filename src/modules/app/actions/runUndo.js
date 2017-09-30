function runUndo({ state }) {
  const undo = state.get('app.undo');

  state[undo.method](undo.path, ...undo.args);
}

export default runUndo;
