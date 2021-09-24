import { useQuery } from 'react-query';
import API from '../API';

const fetchJobs = () => {
  return API.getAllJobs();
}

export default function useJobs() {
  return useQuery('jobs', () => fetchJobs());
}