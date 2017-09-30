import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';
import sandboxDebounce from '../sandboxDebounce';

function showTimedSandboxMessages(messages) {
  let chain = null;
  let currentChain = null;

  messages.forEach((timeMessage, index) => {
    if (!chain) {
      chain = currentChain = [];
    }

    const continueChain =
      index === messages.length - 1
        ? set(state`sandbox.sandboxMessage`, timeMessage.message)
        : [set(state`sandbox.sandboxMessage`, timeMessage.message)];
    currentChain.push(sandboxDebounce(timeMessage.time));
    currentChain.push({
      continue: continueChain,
      discard: [],
    });
    currentChain = continueChain;
  });

  return chain;
}

export default showTimedSandboxMessages;
