export default function (shortcuts) {
  return function (module) {
    module.controller.on('initialized', function () {
      Object.keys(shortcuts).forEach(function (shortcut) {
        const keyCodes = shortcut.split('+')
        const keyCode = keyCodes.pop().toUpperCase().charCodeAt(0)
        const specialKey = keyCodes[0]

        window.addEventListener('keydown', function (event) {
          if (specialKey === 'ctrl' && !event.crlKey) {
            return
          }
          if (specialKey === 'cmd' && !event.metaKey) {
            return
          }

          if (specialKey === 'alt' && !event.altKey) {
            return
          }

          if (specialKey === 'shift' && !event.shiftKey) {
            return
          }

          if (event.keyCode === keyCode) {
            event.preventDefault()
            event.stopPropagation()
            module.controller.getSignal(shortcuts[shortcut])()
          }
        })
      })
    })

    return {}
  }
}
