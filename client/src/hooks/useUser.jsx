import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { getStoredUser, setStoredUser, clearStoredUser } from '../utils/storage';

const useUser = () => {
    const [user, setUser] = useState(getStoredUser);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.setQueryData('user', user);
    }, [])

    const updateUser = newUser => {
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