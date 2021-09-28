import { useQuery } from 'react-query';
import API from '../API';

const fetchParts = async () => {
    const parts = await API.getAllParts();
    console.log('GET ALL PARTS:\n', parts.data);
    return parts;
}

export default function useParts() {
    return useQuery('parts', () => fetchParts());
}