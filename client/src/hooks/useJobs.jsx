import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchJobs = async (key, value) => {
    try {
        return await API.searchJobs(key, value);
    } catch(err) { console.error(err.message) }
}

const useJobs = (key, value) => {
    return useQuery('jobs', () => fetchJobs(key, value));
}

export default useJobs;