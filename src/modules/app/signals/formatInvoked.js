const prettier = require("prettier");

export default function({state}) {
    const fileIndex = state.get(`app.currentBin.selectedFileIndex`);
    const fileContent = state.get(`app.currentBin.files.${fileIndex}.content`);
    const fileLines = fileContent.split("\n");
    console.log("from:", fileContent)
    const newSource = prettier.format(fileContent);
    console.log("to:", newSource)
    return {
          codeChange: {
            from: {line: 0, ch: 0},
            to: {line: fileLines.length - 1 , ch: fileLines[fileLines.length - 1].length},
            text: newSource.split("\n")
          }
        };

}