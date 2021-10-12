const getStoredUser = () => {
    const storedUser = localStorage.getItem('metronics');
    return storedUser ? JSON.parse(storedUser) : null;
}

const setStoredUser = user => {
    localStorage.setItem('metronics', JSON.stringify(user));
}

const clearStoredUser = () => {
    localStorage.removeItem('metronics');
}

export { getStoredUser, setStoredUser, clearStoredUser };