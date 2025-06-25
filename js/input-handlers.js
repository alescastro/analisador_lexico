import { hasInvalidMainChar, hasInvalidTokenChar } from './validators.js';
import { getMainInputValue, getConsoleOutput, clearHighlight } from './dom-utils.js';
import StateMachine from './state-machine.js';

const fsm = new StateMachine();

const handleMainTyping = (event) => {
    if (hasInvalidMainChar(event.key)) {
        event.preventDefault();
        return;
    }

    if (event.code !== 'Space' && event.code !== 'Enter') {
        fsm.consume(event.key);
        return;
    }

    const currentInput = getMainInputValue().trim();
    if (currentInput.length > 0) {
        const words = currentInput.split(' ');
        const last = words[words.length - 1];
        const output = getConsoleOutput();

        output.innerHTML = `<p class="console-item">${last}: <span style="color: ${fsm.isRecognized(last) ? 'green' : 'red'};">${fsm.isRecognized(last) ? 'Reconhecido' : 'Não Reconhecido'}</span></p>`;
        clearHighlight();
    }
};

const handleTokenTyping = (event) => {
    if (hasInvalidTokenChar(event.key)) {
        event.preventDefault();
        return;
    }

    if (event.code === 'Enter') {
        window.registerToken();
    }
};

export { handleMainTyping, handleTokenTyping };