const hasInvalidTokenChar = (char) => !char.match(/[a-z]/);
const hasInvalidMainChar = (char) => !char.match(/[a-z\s]/);
const isEmpty = (str) => str.trim().length === 0;

export { hasInvalidTokenChar, hasInvalidMainChar, isEmpty };