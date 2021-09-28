import { useQuery } from 'react-query';
import API from '../API';

const fetchParts = async (key, value) => {
    return await API.searchParts(key, value);
}

export default function useParts(key, value) {
    return useQuery(['parts'], () => fetchParts(key, value));
}