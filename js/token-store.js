const STORAGE_KEY = "tokens";

const loadTokens = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const persistToken = (token) => {
    const tokens = loadTokens();
    tokens.push(token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
};

const deleteStoredToken = (token) => {
    const tokens = loadTokens().filter(t => t !== token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
};

const listAllTokens = () => loadTokens();

const isTokenStored = (token) => loadTokens().includes(token);

export { persistToken, deleteStoredToken, listAllTokens, isTokenStored };