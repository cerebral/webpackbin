import { when } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import turnOnLiveBin from '../chains/turnOnLiveBin';
import turnOffLiveBin from '../chains/turnOffLiveBin';

export default [
  when(state`app.currentBin.isLive`),
  {
    true: turnOffLiveBin,
    false: turnOnLiveBin,
  },
];
