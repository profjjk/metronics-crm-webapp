import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getStoredToken, clearStoredToken } from '../../utils/storage';
import API from "../../utils/API";

const fetchUser = async (id) => {
    try {
        return await API.getUser(id);
    } catch(err) {
        clearStoredToken();
        console.error(err.message)
    }
}

const useUser = () => {
    const qc = useQueryClient();
    const [user, setUser] = useState(getStoredToken());

    useQuery('user', () => fetchUser(user._id), {
        enabled: !!user,
        onSuccess: res => {
            setUser({
                _id: res.data._id,
                username: res.data.username
            })
        }
    })

    const updateUser = newUser => {
        setUser({
            _id: newUser._id,
            username: newUser.username
        });
        qc.setQueryData('user', user);
    }

    const clearUser = () => {
        setUser(null);
        qc.setQueryData('user', null);
        qc.removeQueries(['user', 'jobs', 'customers', 'parts']);
    }

    return { user, updateUser, clearUser }
}

export default useUser;