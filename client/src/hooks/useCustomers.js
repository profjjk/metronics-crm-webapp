import { useQuery } from 'react-query';
import API from '../API';

const fetchCustomers = () => {
  return API.getAllCustomers();
}

export default function useCustomers() {
  return useQuery('customers', () => fetchCustomers());
}