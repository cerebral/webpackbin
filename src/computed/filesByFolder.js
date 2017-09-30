import { compute } from 'cerebral';
import { state } from 'cerebral/tags';
import path from 'path';

export default compute(state`app.currentBin.files`, function(files) {
  const folders = files.reduce(function(folders, file, index) {
    const dirname =
      path.dirname(file.name) === '.' ? '/' : `/${path.dirname(file.name)}`;

    if (!folders[dirname]) {
      folders[dirname] = [];
    }

    folders[dirname].push({
      name: file.name,
      index,
      show: file.show,
    });

    return folders;
  }, {});

  return Object.keys(folders)
    .sort()
    .map(function(folderName) {
      return {
        name: folderName,
        files: folders[folderName],
      };
    });
});
