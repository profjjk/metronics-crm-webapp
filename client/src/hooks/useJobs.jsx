import { useQuery } from 'react-query';
import API from '../API';

const fetchJobs = async () => {
    const jobs = await API.getAllJobs();
    console.log('GET ALL JOBS:\n', jobs.data);
    return jobs;
}

export default function useJobs() {
    return useQuery(['jobs'], () => fetchJobs());
}