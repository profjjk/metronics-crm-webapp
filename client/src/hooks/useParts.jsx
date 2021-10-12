import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchParts = async () => {
    try {
        return await API.searchParts();
    } catch(err) { console.error(err.message) }
}

const useParts = () => {
    return useQuery('parts', () => fetchParts());
}

export default useParts;