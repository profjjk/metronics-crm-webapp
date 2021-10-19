import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredUser, setStoredUser, clearStoredUser } from '../utils/storage';
import API from "../utils/API";

const fetchUser = async (id) => {
    try {
        return await API.getUser(id);
    } catch(err) { console.error(err.message) }
}

const useUser = () => {
    const [user, setUser] = useState(getStoredUser);
    const queryClient = useQueryClient();

    useQuery('user', () => fetchUser(user.id), {
        enabled: !!user,
        onSuccess: res => {
            if (user) {
                const token = user.token
                setUser({
                    id: res.data._id,
                    username: res.data.username,
                    auth: res.data.authorization === 'administrator' ? 'private' : 'public',
                    token: token
                })
            }
        }
    })

    const updateUser = newUser => {
        // Need to include the token with the newUser... not using this function at the moment.
        setUser(newUser);
        setStoredUser(newUser);
        queryClient.setQueryData('user', newUser);
    }

    const clearUser = () => {
        setUser(null);
        clearStoredUser();
        queryClient.setQueryData('user', null);
        queryClient.removeQueries(['user', 'jobs', 'customers', 'parts']);
    }

    return { user, updateUser, clearUser }
}

export default useUser;