import config from 'config'
import {decodeKey} from 'utils'

function updateSandbox ({http, state, path, resolve}) {
  const currentBin = state.get('app.currentBin')
  const region = state.get('settings.region')
  const sortedPackages = Object.keys(currentBin.packages || {}).sort().reduce((currentSortedPackages, packageKey) => {
    currentSortedPackages[decodeKey(packageKey)] = currentBin.packages[packageKey]

    return currentSortedPackages
  }, {})
  const started = Date.now()

  return new Promise((resolve, reject) => {
    function makeRequest () {
      http.post(config.sandboxServiceUrl[region], {
        files: currentBin.files,
        packages: sortedPackages,
        loaders: currentBin.loaders
      }, {
        withCredentials: true
      })
        .then(() => {
          resolve()
        })
        .catch((response) => {
          if (response.status === 504 && Date.now() - started < config.sandboxTotalTimeout) {
            makeRequest()
          } else {
            reject(response)
          }
        })
    }

    makeRequest()
  })
    .then(path.success)
    .catch((response) => {
      return path.error({status: response.status, error: response.result})
    })
}

export default updateSandbox
