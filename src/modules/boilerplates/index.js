import boilerplatesClicked from './signals/boilerplatesClicked';
import boilerplateClicked from './signals/boilerplateClicked';

export default {
  state: {
    isLoadingBoilerplates: false,
    list: null,
  },
  signals: {
    boilerplatesClicked,
    boilerplateClicked,
  },
};
