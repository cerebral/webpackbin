import simpleTemplate from '../quickstartTemplates/simple'
import simpleWithCssTemplate from '../quickstartTemplates/simpleWithCss'
import typescriptWithCssTemplate from '../quickstartTemplates/typescriptWithCss'

const templates = {
  simple: simpleTemplate,
  simpleWithCss: simpleWithCssTemplate,
  typescriptWithCss: typescriptWithCssTemplate
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
