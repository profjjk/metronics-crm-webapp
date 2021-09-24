import { useQuery } from 'react-query';
import API from '../API';

const fetchPart = partId => {
  return API.getPartById(partId);
}

export default function usePart(partId) {
  return useQuery(['part', partId], () => fetchPart(partId));
}