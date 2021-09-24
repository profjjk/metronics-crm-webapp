import { useQuery } from 'react-query';
import axios from 'axios';

const fetchJob = async jobId => {
  return await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
}

export default function useJob(jobId) {
  return useQuery(['job', jobId], () => fetchJob(jobId));
}