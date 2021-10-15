import useUser from "./useUser";
import API from '../utils/API';

const useAuth = () => {
    const { updateUser, clearUser } = useUser();

    const login = async (username, password) => {
        try {
            const response = await API.login(username, password);
            if (response.data) {
                console.log("useAuth.login: ", response)
                updateUser(response.data);
            }
        } catch(err) { console.error(err.message) }
    }

    const register = async (username, password, authorization) => {
        const newUser = {
            username: username,
            password: password,
            authorization: authorization
        }
        try {
            const response = await API.register(newUser);
            console.log("Register response: ", response)
            if (response.data) {
                updateUser(response.data);
            }
        } catch(err) { console.error(err.message) }
    }

    const logout = () => {
        clearUser();
    }

    return { login, register, logout }
}

export default useAuth;