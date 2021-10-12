import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchParts = async (key, value) => {
    try {
        return await API.searchParts(key, value);
    } catch(err) { console.error(err.message) }
}

const useParts = (key, value) => {
    return useQuery('parts', () => fetchParts(key, value));
}

export default useParts;