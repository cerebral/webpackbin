function LogProvider() {
  return (context) => {
    context.log = {
      error(type) {
        context.debugger && context.debugger.send({
          method: 'log.error',
          color: 'purple',
          args: [type]
        })

        const message = `## ${context.input.task.type.toUpperCase()}: ${type} - uid: ${context.input.uid} ## : ${JSON.stringify(Object.assign({}, context.input, {
          data: Object.assign({}, context.input.data, {
            _token: undefined
          })
        }))}`

        console.error(message);
      },
      info(type) {
        context.debugger && context.debugger.send({
          method: 'log.info',
          color: 'purple',
          args: [type]
        })

        const message = `${type} - ${context.input.uid}`

        console.info(message);
      }
    };

    return context;
  };
}

module.exports = LogProvider;
