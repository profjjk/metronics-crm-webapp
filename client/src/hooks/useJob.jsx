import { useQuery } from 'react-query';
import API from '../API';

const fetchJobById = async id => {
    const job = await API.getJobById(id);
    console.log('GET ONE JOB:\n', job.data);
    return job;
}

export default function useJob(id) {
    return useQuery(['job', id], () => fetchJobById(id));
}
