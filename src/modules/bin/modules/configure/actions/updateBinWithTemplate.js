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

  state.set('bin.files.list', JSON.parse(JSON.stringify(template.files)))

  if (template.loaders) {
    state.set('bin.configure.loaders', JSON.parse(JSON.stringify(template.loaders)))
  }

  if (template.packages) {
    state.set('bin.configure.packages', JSON.parse(JSON.stringify(template.packages)))
  }
}

export default updateBinWithTemplate
