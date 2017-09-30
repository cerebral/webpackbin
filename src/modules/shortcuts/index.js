const MODIFIER = {
  ctrl: 'ctrlKey',
  cmd: 'metaKey',
  alt: 'altKey',
};

export default function(shortcuts) {
  return function(module) {
    module.controller.on('initialized', function() {
      Object.keys(shortcuts).forEach(function(shortcut) {
        const [command, key] = shortcut.split('+');

        window.addEventListener('keydown', function(event) {
          if (event.key === key && event[MODIFIER[command]]) {
            event.preventDefault();
            event.stopPropagation();
            module.controller.getSignal(shortcuts[shortcut])();
          }
        });
      });
    });

    return {};
  };
}
