import { useQuery } from 'react-query';
import API from '../API';

const fetchParts = async (key, value) => {
    const parts = await API.searchParts(key, value);
    console.log('INVENTORY SEARCH RESULTS:\n', parts.data);
    return parts;
}

export default function useParts(key, value) {
    return useQuery(['parts'], () => fetchParts(key, value));
}