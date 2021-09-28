import { useQuery } from 'react-query';
import API from '../API';

const fetchPartById = async id => {
    const part = await API.getPartById(id);
    console.log('GET ONE PART:\n', part.data);
    return part;
}

export default function usePart(id) {
    return useQuery(['part', id], () => fetchPartById(id));
}