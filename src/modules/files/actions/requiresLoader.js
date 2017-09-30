import nodePath from 'path';

function requiresLoader({ state, path }) {
  const fileName = state.get(
    `app.currentBin.files.${state.get('app.currentBin.selectedFileIndex')}.name`
  );
  const fileExt = nodePath.extname(fileName);
  const loaders = state.get('app.currentBin.loaders');

  if (fileExt === '.coffee' && !loaders.coffeescript) {
    return path.true({
      loader: 'coffeescript',
    });
  }

  if (fileExt === '.css' && !loaders.css) {
    return path.true({
      loader: 'css',
    });
  }

  if (fileExt === '.less' && !loaders.less) {
    return path.true({
      loader: 'css',
      loaderProp: 'less',
    });
  }

  if (fileExt === '.scss' && !loaders.sass) {
    return path.true({
      loader: 'css',
      loaderProp: 'sass',
    });
  }

  if (fileExt === '.ts' && !loaders.typescript) {
    return path.true({
      loader: 'typescript',
    });
  }

  if (fileExt === '.tsx' && !loaders.typescript) {
    return path.true({
      loader: 'typescript',
    });
  }

  if (fileExt === '.pug' && !loaders.pug) {
    return path.true({
      loader: 'pug',
    });
  }

  if (fileExt === '.handlebars' && !loaders.handlebars) {
    return path.true({
      loader: 'handlebars',
    });
  }

  if (fileExt === '.vue' && !loaders.vue) {
    return path.true({
      loader: 'vue',
    });
  }

  return path.false();
}

export default requiresLoader;
