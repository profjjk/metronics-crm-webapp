import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchJobs = async () => {
    try {
        return await API.searchJobs();
    } catch(err) { console.error(err.message) }
}

const useJobs = () => {
    return useQuery('jobs', () => fetchJobs());
}

export default useJobs;