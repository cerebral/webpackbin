import showSnackbar from 'modules/app/factories/showSnackbar'
import participateLiveBin from '../actions/participateLiveBin'
import listenToBinUpdates from '../actions/listenToBinUpdates'

export default [
  [
    listenToBinUpdates,
    participateLiveBin, {
      success: [
        ...showSnackbar('Joined live session', 5000)
      ],
      false: [
        ...showSnackbar('Unable to join live session', 5000, 'error')
      ]
    }
  ]
]
