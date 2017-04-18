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
  let timeout = null

  return new Promise((resolve, reject) => {
    function makeRequest () {
      timeout = setTimeout(() => {
        http.abort(config.sandboxServiceUrl[region])
      }, 25000)

      http.post(config.sandboxServiceUrl[region], {
        files: currentBin.files,
        packages: sortedPackages,
        loaders: currentBin.loaders
      }, {
        withCredentials: true
      })
        .then(() => {
          clearTimeout(timeout)

          resolve()
        })
        .catch((response) => {
          clearTimeout(timeout)
          if (response.isAborted && Date.now() - started < 90000) {
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
