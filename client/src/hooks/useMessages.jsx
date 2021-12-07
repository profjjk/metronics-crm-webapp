import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchMessages = async () => {
    try {
        return await API.getMessages();
    } catch(err) {
        console.error(err.message);
        window.location.reload();
    }
}

const useMessages = () => {
    return useQuery('messages', () => fetchMessages());
}

export default useMessages;