import { useQuery } from 'react-query';
import API from '../API';

const fetchJobs = async (key, value) => {
    const jobs = await API.searchJobs(key, value);
    console.log('JOB SEARCH RESULTS:\n', jobs.data);
    return jobs;
}

export default function useJobQuery(key, value) {
    return useQuery(['jobQuery'], () => fetchJobs(key, value));
}