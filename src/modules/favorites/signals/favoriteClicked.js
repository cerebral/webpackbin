import { props } from 'cerebral/tags';
import redirectToBin from 'modules/app/factories/redirectToBin';
import appClicked from 'modules/app/signals/clicked';

export default [appClicked, redirectToBin(props`binKey`)];
