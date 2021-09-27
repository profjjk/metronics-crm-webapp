import { useQuery } from 'react-query';
import API from '../API';

const fetchJobById = async (customerId, jobId) => {
    const customer = await API.getCustomerById(customerId);
    const job = customer.data.jobs.filter(job => job._id === jobId)
    console.log('\n***** GET JOB BY ID *****')
    console.log(job);
    return job;
}

export default function useJob(customerId, jobId) {
    return useQuery(['job', jobId], () => fetchJobById(customerId, jobId));
}