import simpleTemplate from '../quickstartTemplates/simple'
import simpleWithCssTemplate from '../quickstartTemplates/simpleWithCss'
import typescriptWithCssTemplate from '../quickstartTemplates/typescriptWithCss'

const templates = {
  simple: simpleTemplate,
  simpleWithCss: simpleWithCssTemplate,
  typescriptWithCss: typescriptWithCssTemplate
}

function updateBinWithTemplate ({input, state}) {
  const template = templates[input.template]

  state.set('bin.currentBin.files', JSON.parse(JSON.stringify(template.files)))

  if (template.loaders) {
    state.set('bin.currentBin.loaders', JSON.parse(JSON.stringify(template.loaders)))
  }

  if (template.packages) {
    state.set('bin.currentBin.packages', JSON.parse(JSON.stringify(template.packages)))
  }
}

export default updateBinWithTemplate
