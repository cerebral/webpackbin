import nodePath from 'path'

const validFileNames = [
  '.js',
  '.css',
  '.html',
  '.json',
  '.ts',
  '.tsx',
  '.handlebars',
  '.coffee',
  '.less',
  '.scss',
  '.vue'
]

function isValidFile ({state, path}) {
  const fileName = state.get('bin.currentBin.newFileName')
  const ext = nodePath.extname(fileName)

  if (validFileNames.indexOf(ext) === -1) {
    return path.false()
  }

  return path.true()
}

export default isValidFile
