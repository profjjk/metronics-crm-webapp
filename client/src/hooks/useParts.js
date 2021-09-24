import {useQuery} from 'react-query';
import axios from 'axios';

const fetchParts = async () => {
  return await axios.get('http://localhost:8080/api/parts/');
}

export default function useParts() {
  return useQuery('parts', () => fetchParts());
}