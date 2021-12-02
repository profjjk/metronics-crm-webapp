import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchParts = async () => {
    try {
        return await API.getParts();
    } catch(err) {
        console.error(err.message)
        window.location.reload();
    }
}

const useParts = () => {
    return useQuery('parts', () => fetchParts());
}

export default useParts;