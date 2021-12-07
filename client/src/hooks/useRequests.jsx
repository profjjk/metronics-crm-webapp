import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchRequests = async () => {
    try {
        return await API.getRequests();
    } catch(err) {
        console.error(err.message);
        window.location.reload();
    }
}

const useRequests = () => {
    return useQuery('requests', () => fetchRequests());
}

export default useRequests;