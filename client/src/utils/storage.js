const getStoredToken = () => {
    return JSON.parse(localStorage.getItem('metronics'))
}

const setStoredToken = token => {
    localStorage.setItem('metronics', JSON.stringify(token));
}

const clearStoredToken = () => {
    localStorage.removeItem('metronics');
}

export { getStoredToken, setStoredToken, clearStoredToken };