import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

export default compute(state`app.currentBin.files`, function(files) {
  return files
    .map(function(file, index) {
      return {
        name: file.name,
        index,
        isEntry: file.isEntry,
        show: file.show,
      };
    })
    .filter(function(file) {
      return file.show !== false;
    })
    .sort(function(fileA, fileB) {
      if (!fileA.show && fileB.show) {
        return -1;
      } else if (fileA.show && !fileB.show) {
        return 1;
      } else if (fileA.show > fileB.show) {
        return 1;
      } else if (fileA.show < fileB.show) {
        return -1;
      }

      return 0;
    });
});
