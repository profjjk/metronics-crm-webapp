import { useQuery } from 'react-query';
import API from '../utils/API';

const fetchJobs = async () => {
    try {
        return await API.getJobs();
    } catch(err) {
        console.error(err.message);
        window.location.reload();
    }
}

const useJobs = () => {
    return useQuery('jobs', () => fetchJobs());
}

export default useJobs;