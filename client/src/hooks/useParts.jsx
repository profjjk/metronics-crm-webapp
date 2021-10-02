import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchParts = async (restock, key, value) => {
    if (restock) {
        let parts = await API.searchParts(key, value);
        parts = parts.data.filter(part => part.stock <= part.minimum)
        return parts;
    } else {
        return await API.searchParts(key, value);
    }
}

export default function useParts(restock, key, value) {
    return useQuery(['parts', value || 'all'], () => fetchParts(restock, key, value));
}