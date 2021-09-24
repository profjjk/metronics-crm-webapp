import { useQuery } from 'react-query';
import API from '../API';

const fetchJob = jobId => {
  return API.getJobById(jobId);
}

export default function useJob(jobId) {
  return useQuery(['job', jobId], () => fetchJob(jobId));
}