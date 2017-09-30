import showSnackbar from './showSnackbar';
import { sequence } from 'cerebral';
import { getUser, signInAnonymously } from '@cerebral/firebase/operators';
import { set, when } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import setUserRelatedData from '../chains/setUserRelatedData';

export default function(continueChain) {
  return sequence('authenticate', [
    when(state`app.user`),
    {
      true: continueChain,
      false: [
        getUser(),
        {
          error: showSnackbar('An error occured during authentication'),
          success: [
            when(props`response.user`),
            {
              true: [
                set(state`app.user`, props`response.user`),
                setUserRelatedData,
                set(state`app.isAuthenticating`, false),
                continueChain,
              ],
              false: [
                signInAnonymously(),
                {
                  success: [
                    set(state`app.isAuthenticating`, false),
                    set(state`app.user`, props`response.user`),
                    continueChain,
                  ],
                  error: showSnackbar(
                    'An error occured creating you an anonymous account'
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
