import es2015Template from '../quickstartTemplates/es2015'
import typescriptTemplate from '../quickstartTemplates/typescript'

const templates = {
  es2015: es2015Template,
  typescript: typescriptTemplate
}

function updateBinWithTemplate ({props, state}) {
  const template = templates[props.template]

  state.set('app.currentBin.files', JSON.parse(JSON.stringify(template.files)))

  if (template.loaders) {
    state.set('app.currentBin.loaders', JSON.parse(JSON.stringify(template.loaders)))
  }

  if (template.packages) {
    state.set('app.currentBin.packages', JSON.parse(JSON.stringify(template.packages)))
  }
}

export default updateBinWithTemplate
