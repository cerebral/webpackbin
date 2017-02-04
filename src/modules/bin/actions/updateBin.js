import config from 'config'

function updateBin ({http, state, path, resolve}) {
  const files = state.get('bin.files')

  return http.post(config.sandboxServiceUrl, {
    files
  })
    .then(path.success)
    .catch(path.error)
}

export default updateBin
