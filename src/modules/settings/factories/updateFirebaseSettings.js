import { sequence } from 'cerebral';

function updateFirebaseSettingsFactory(keysOrKey, paths) {
  return sequence('updateFirebaseSettings', [
    function updateFirebaseSettings({ firebase, path, state }) {
      const userUid = state.get('app.user.uid');

      if (Array.isArray(keysOrKey)) {
        return firebase
          .update(
            `settings.${userUid}`,
            keysOrKey.reduce((payload, settingsPropKey) => {
              payload[settingsPropKey] = state.get(
                `settings.${settingsPropKey}`
              );

              return payload;
            }, {})
          )
          .then(path.success)
          .catch(path.error);
      }

      return firebase
        .set(
          `settings.${userUid}.${keysOrKey}`,
          state.get(`settings.${keysOrKey}`)
        )
        .then(path.success)
        .catch(path.error);
    },
    paths
      ? Object.assign(
          {
            success: [],
            error: [],
          },
          paths
        )
      : {
          success: [],
          error: [],
        },
  ]);
}

export default updateFirebaseSettingsFactory;
