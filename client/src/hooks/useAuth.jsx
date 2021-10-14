import useUser from "./useUser";
import API from '../utils/API';

const getJWTHeader = (accessToken) => {
    return { Authorization: `Bearer ${accessToken}`};
}
const axiosInstance = axios.create({ baseURL: 'http://localhost:8080' });

export const useAuth = () => {
    const { updateUser, clearUser } = useUser();

    const authServerCall = () => {

    }
}