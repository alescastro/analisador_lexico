import StateMachine from './state-machine.js';

const fsm = new StateMachine();
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

const getTokenInputValue = () => document.getElementById("input-token").value;
const getMainInputValue = () => document.getElementById("input-main").value;
const getConsoleOutput = () => document.getElementById("console");

const clearTokenInput = () => { document.getElementById("input-token").value = ""; };

const clearConsoleOutput = () => {
    getConsoleOutput().innerHTML = "";
    document.getElementById("input-main").value = "";
    clearHighlight();
};

const clearHighlight = () => {
    const foundItems = document.querySelectorAll('.found');
    foundItems.forEach(el => el.classList.remove('found'));
    fsm.restartCurrentState();
};

const renderTableHead = () => {
    const headRow = document.getElementById("head-row");
    headRow.innerHTML = "<th>#</th>";
    alphabet.forEach(letter => {
        headRow.innerHTML += `<th>${letter}</th>`;
    });
};

const renderTableBody = () => {
    const tbody = document.getElementById("state-table-body");
    tbody.innerHTML = '';

    const transitions = fsm.getAllTransitions();

    for (const [state, links] of Object.entries(transitions)) {
        let row = `<tr id="${state}"><td>${state}</td>`;
        alphabet.forEach(letter => {
            row += `<td id="${state}${letter}">${links[letter] || '-'}</td>`;
        });
        row += '</tr>';
        tbody.innerHTML += row;
    }
};

const randomWord = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    const len = Math.floor(Math.random() * 9) + 2;
    for (let i = 0; i < len; i++) {
        word += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById("input-token").value = word;
};

export {
    getTokenInputValue,
    getMainInputValue,
    getConsoleOutput,
    clearTokenInput,
    clearConsoleOutput,
    clearHighlight,
    renderTableHead,
    renderTableBody,
    randomWord
};