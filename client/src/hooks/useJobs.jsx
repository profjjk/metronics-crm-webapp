import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchJobs = async (key, value) => {
    return await API.searchJobs(key, value);
}

export default function useJobs(key, value) {
    return useQuery(['jobs', value || 'all'], () => fetchJobs(key, value));
}