function toggleLogPath({ props, state }) {
  state.set(
    `log.list.${props.path.join('.')}.isCollapsed`,
    !state.get(`log.list.${props.path.join('.')}.isCollapsed`)
  );
  state.set('app.currentBin.selectedLogPath', props.path);
}

export default toggleLogPath;
