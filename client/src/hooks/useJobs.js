import { useQuery } from 'react-query';
import axios from 'axios';

const fetchJobs = async () => {
  return await axios.get('http://localhost:8080/api/jobs/');
}

export default function useJobs() {
  return useQuery('jobs', () => fetchJobs());
}