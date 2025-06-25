import {
    persistToken,
    deleteStoredToken,
    isTokenStored,
    listAllTokens
} from './token-store.js';

import {
    getTokenInputValue,
    clearTokenInput,
    renderTableHead,
    renderTableBody
} from './dom-utils.js';

import {
    isEmpty,
    hasInvalidTokenChar
} from './validators.js';

import StateMachine from './state-machine.js';

let selectedWord = '';
let selectedRow = null;
const fsm = new StateMachine();
let headRendered = false;

const onTokenRowClick = (row) => {
    const tds = row.getElementsByTagName('td');
    const word = tds[1].textContent;

    if (selectedWord === word) {
        row.classList.remove("selected");
        selectedWord = '';
        selectedRow = null;
        return;
    }

    if (selectedRow) selectedRow.classList.remove("selected");
    row.classList.add("selected");
    selectedWord = word;
    selectedRow = row;
};

const registerToken = () => {
    const token = getTokenInputValue();

    if (isEmpty(token)) return alert("Token não pode ser vazio.");
    if (hasInvalidTokenChar(token)) return alert("Token com caracteres inválidos.");
    if (isTokenStored(token)) return alert("Token já existe.");

    persistToken(token);
    updateTokens();
    clearTokenInput();
};

const removeToken = () => {
    if (isEmpty(selectedWord)) return alert("Nenhum token selecionado.");
    deleteStoredToken(selectedWord);
    updateTokens();
};

const initTokens = () => {
    updateTokens();
    if (!headRendered) {
        renderTableHead();
        headRendered = true;
    }
};

const updateTokens = () => {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = '';

    const tokens = listAllTokens();
    fsm.resetMachine();

    tokens.forEach((t, idx) => {
        fsm.addWord(t);
        tbody.innerHTML += `<tr onclick="onTokenRowClick(this)"><td>${idx + 1}</td><td>${t}</td></tr>`;
    });

    renderTableBody();
};

export {
    registerToken,
    removeToken,
    initTokens,
    onTokenRowClick
};