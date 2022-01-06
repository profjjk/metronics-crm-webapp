import useUser from "./useUser";
import API from '../../utils/API';
import {clearStoredToken, setStoredToken} from "../../utils/storage";

const useAuth = () => {
    const { updateUser, clearUser } = useUser();

    const login = async (username, password) => {
        try {
            const response = await API.login(username, password);
            if (response.data) {
                setStoredToken({ _id: response.data._id, token: response.data.token });
            }
        } catch(err) { console.error(err.message) }
    }

    const register = async ({ username, password }) => {
        const newUser = {
            username: username,
            password: password
        }
        try {
            const response = await API.register(newUser);
            // if (response.data) {
            //     updateUser(response.data);
            // }
            return response;
        } catch(err) { console.error(err.message) }
    }

    const logout = () => {
        clearStoredToken();
        clearUser();
    }

    return { login, register, logout }
}

export default useAuth;