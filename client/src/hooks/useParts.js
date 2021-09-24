import {useQuery} from 'react-query';
import API from '../API';

const fetchParts = () => {
  return API.getAllParts();
}

export default function useParts() {
  return useQuery('parts', () => fetchParts());
}