import config from 'config'

function updateSandbox ({http, state, path, resolve}) {
  const files = state.get('bin.files.list')

  return http.post(config.sandboxServiceUrl, {
    files
  })
    .then(path.success)
    .catch(path.error)
}

export default updateSandbox
