import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPart = async partId => {
  return await axios.get(`http://localhost:8080/api/parts/${partId}`);
}

export default function usePart(partId) {
  return useQuery(['part', partId], () => fetchPart(partId));
}