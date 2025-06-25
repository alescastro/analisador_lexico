let instance = null;

class StateMachine {
    constructor() {
        if (instance) return instance;

        this._transitions = {};
        this._initial = 's0';
        this._current = this._initial;
        this._accepting = new Set();
        this._registeredWords = new Set();
        this._nextStateIndex = 1;

        instance = this;
    }

    resetMachine() {
        this._transitions = {};
        this._accepting.clear();
        this._registeredWords.clear();
        this._nextStateIndex = 1;
        this._current = this._initial;
    }

    restartCurrentState() {
        this._current = this._initial;
    }

    getAllTransitions() {
        return this._transitions;
    }

    addWord(word) {
        let cursor = this._initial;

        for (const char of word) {
            if (!this._transitions[cursor]) {
                this._transitions[cursor] = {};
            }

            if (!this._transitions[cursor][char]) {
                const next = `s${this._nextStateIndex++}`;
                this._transitions[cursor][char] = next;
            }

            cursor = this._transitions[cursor][char];
        }

        this._accepting.add(cursor);
        this._registeredWords.add(word);
        this._current = this._initial;
    }

    consume(char) {
        if (this._current === null) return;

        const nextState = this._transitions[this._current]?.[char];

        if (nextState) {
            const cell = document.getElementById(`${this._current}${char}`);
            cell?.classList.add('found');
            this._current = nextState;
        } else {
            this._current = null;
        }
    }

    isRecognized(word) {
        return this._accepting.has(this._current);
    }
}

export default StateMachine;