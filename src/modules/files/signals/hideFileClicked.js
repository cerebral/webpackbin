import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import isSelectedFile from '../actions/isSelectedFile';
import setNewSelectedFileIndex from '../actions/setNewSelectedFileIndex';

export default [
  isSelectedFile,
  {
    true: [setNewSelectedFileIndex],
    false: [],
  },
  set(state`app.currentBin.files.${props`index`}.show`, false),
];
