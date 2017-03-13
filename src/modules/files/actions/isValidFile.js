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
  '.vue',
  '.pug'
]

function isValidFile ({state, path}) {
  const fileName = state.get('app.currentBin.newFileName')
  const isEntry = state.get('app.currentBin.newFileIsEntry')
  const ext = nodePath.extname(fileName)

  if (fileName === 'bundle.js' || validFileNames.indexOf(ext) === -1 || isEntry && ext !== '.js') {
    return path.false()
  }

  return path.true()
}

export default isValidFile
