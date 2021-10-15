const getStoredUser = () => {
    return JSON.parse(localStorage.getItem('metronics'))
}

const setStoredUser = user => {
    localStorage.setItem('metronics', JSON.stringify(user));
}

const clearStoredUser = () => {
    localStorage.removeItem('metronics');
}

export { getStoredUser, setStoredUser, clearStoredUser };