import {set, when} from 'cerebral/operators';
import {state} from 'cerebral/tags';
import closeAllPopups from '../chains/closeAllPopups';

export default [
  ...closeAllPopups,
  set(state`header.showProfileMenu`, false),
  set(state`header.showNotificationMenu`, false),
  set(state`header.showFeedbackModal`, false),
  set(state`challenge.teamChallenge.moreOptionsActivityKey`, null),
  set(state`app.moreOptionsActivityKey`, null),
  when(state`useragent.media.small`), {
    true: [
      set(state`header.showMainMenu`, false)
    ],
    false: []
  }
];
