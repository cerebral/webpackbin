import { transformCode } from 'utils';

function changeCode({ props, state }) {
  const selectedFileIndex =
    props.codeChange.fileIndex || state.get('app.currentBin.selectedFileIndex');
  const code = state.get(`app.currentBin.files.${selectedFileIndex}.content`);

  state.set(
    `app.currentBin.files.${selectedFileIndex}.content`,
    transformCode(code, props.codeChange)
  );
  state.set(`app.currentBin.files.${selectedFileIndex}.lastCursorPosition`, {
    line: props.codeChange.to.line,
    ch: props.codeChange.to.ch,
  });
}

export default changeCode;
