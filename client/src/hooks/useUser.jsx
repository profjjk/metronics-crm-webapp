import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredToken, clearStoredToken } from '../utils/storage';
import API from "../utils/API";

const fetchUser = async (id) => {
    try {
        return await API.getUser(id);
    } catch(err) {
        clearStoredToken();
        console.error(err.message)
    }
}

const useUser = () => {
    const [user, setUser] = useState(getStoredToken());
    const queryClient = useQueryClient();

    useQuery('user', () => fetchUser(user._id), {
        enabled: !!user,
        onSuccess: res => {
            setUser({
                _id: res.data._id,
                username: res.data.username,
                auth: res.data.authorization === 'administrator' ? 'private' : 'public',
            })
        }
    })

    const updateUser = newUser => {
        setUser({
            _id: newUser._id,
            username: newUser.username,
            auth: newUser.authorization === 'administrator' ? 'private' : 'public',
        });
        queryClient.setQueryData('user', user);
    }

    const clearUser = () => {
        setUser(null);
        queryClient.setQueryData('user', null);
        queryClient.removeQueries(['user', 'jobs', 'customers', 'parts']);
    }

    return { user, updateUser, clearUser }
}

export default useUser;