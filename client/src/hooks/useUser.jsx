import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredUser, setStoredUser, clearStoredUser } from '../utils/storage';
import API from "../utils/API";

const fetchUser = async id => {
    try {
        return await API.getUser(id);
    } catch(err) { console.error(err.message) }
}

const useUser = id => {
    const [user, setUser] = useState(getStoredUser());
    const queryClient = useQueryClient();

    useQuery('user', () => fetchUser(id), {
        enabled: !!user,
        onSuccess: data => console.log(data)
    })

    const updateUser = newUser => {
        setUser(newUser);
        setStoredUser(newUser);
        queryClient.setQueryData('user', newUser);
    }

    const clearUser = () => {
        setUser(null);
        clearStoredUser();
        queryClient.setQueryData('user', null);
        queryClient.removeQueries('user');
    }

    return { user, updateUser, clearUser }
}

export default useUser;