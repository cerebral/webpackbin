export default {
  selectedFileIndex: 1,
  loaders: {
    typescript: true
  },
  files: [{
    name: 'index.html',
    content: `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
    </head>
    <body>
      <script src="main.ts"></script>
    </body>
  </html>
  `
  }, {
    name: 'main.ts',
    isEntry: true,
    content: ''
  }]
}
